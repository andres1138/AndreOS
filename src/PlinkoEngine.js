import Matter from 'matter-js';

const {
  Engine, Render, Runner, Bodies, Body, Composite, Events,
} = Matter;

// Multiplier tables by risk and row count (matching Stake's actual values)
const MULTIPLIER_TABLES = {
  low: {
    8:  [5.6, 2.1, 1.1, 1, 0.5, 1, 1.1, 2.1, 5.6],
    12: [10, 3, 1.6, 1.4, 1.1, 1, 0.5, 1, 1.1, 1.4, 1.6, 3, 10],
    16: [16, 9, 2, 1.4, 1.4, 1.2, 1.1, 1, 0.5, 1, 1.1, 1.2, 1.4, 1.4, 2, 9, 16],
  },
  medium: {
    8:  [13, 3, 1.3, 0.7, 0.4, 0.7, 1.3, 3, 13],
    12: [33, 11, 4, 2, 1.1, 0.6, 0.3, 0.6, 1.1, 2, 4, 11, 33],
    16: [110, 41, 10, 5, 3, 1.5, 1, 0.5, 0.3, 0.5, 1, 1.5, 3, 5, 10, 41, 110],
  },
  high: {
    8:  [29, 4, 1.5, 0.3, 0.2, 0.3, 1.5, 4, 29],
    12: [170, 24, 8.1, 2, 0.7, 0.2, 0.2, 0.2, 0.7, 2, 8.1, 24, 170],
    16: [1000, 130, 26, 9, 4, 2, 0.2, 0.2, 0.2, 0.2, 0.2, 2, 4, 9, 26, 130, 1000],
  },
};

export default class PlinkoEngine {
  constructor(containerEl, { rows = 16, risk = 'medium', onBallLand }) {
    this.rows = rows;
    this.risk = risk;
    this.onBallLand = onBallLand;
    this.containerEl = containerEl;
    this.balls = [];
    this.activeBalls = 0;

    this.width = 750;
    this.height = 560;

    // ===================================================================
    // THE MATH BEHIND PROPER PLINKO:
    //
    // For a Galton board to produce a binomial distribution, the ball MUST
    // interact with a pin on EVERY row. This means:
    //
    //   gap_between_pin_edges < ball_diameter
    //   (pinSpacing - 2*pinRadius) < 2*ballRadius
    //   pinSpacing < 2*(pinRadius + ballRadius)
    //
    // With pinRadius=10, ballRadius=6: pinSpacing < 32
    // We use pinSpacing=28-30, giving gap=8-10 vs ball diameter=12.
    // Ball is WIDER than the gap → it MUST hit a pin every row. ✓
    // ===================================================================
    this.pinRadius = 10;
    this.ballRadius = 6;

    this.engine = Engine.create({
      gravity: { x: 0, y: 1.6 },
    });

    this.render = Render.create({
      element: containerEl,
      engine: this.engine,
      options: {
        width: this.width,
        height: this.height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio || 1,
      },
    });

    this.runner = Runner.create();

    this._buildBoard();
    this._setupCollisionEvents();

    Render.run(this.render);
    Runner.run(this.runner, this.engine);
  }

  _buildBoard() {
    Composite.clear(this.engine.world, false);

    const startY = 45;
    const endY = this.height - 55;
    const rowSpacing = (endY - startY) / this.rows;

    // Pin spacing: Must satisfy pinSpacing < 2*(pinRadius + ballRadius) = 32
    // Using 28-30 ensures the ball cannot slip between pins
    const maxPinSpacing = 2 * (this.pinRadius + this.ballRadius) - 2; // = 30
    const pinSpacing = Math.min(maxPinSpacing, (this.width - 40) / (this.rows + 4));

    this.pins = [];
    this.pinSpacing = pinSpacing;

    // Triangular layout: row i has (i+3) pins
    // Each row naturally offsets by half a pin spacing due to the +1 pin count
    for (let row = 0; row < this.rows; row++) {
      const pinsInRow = row + 3;
      const y = startY + row * rowSpacing;
      const rowWidth = (pinsInRow - 1) * pinSpacing;
      const startX = (this.width - rowWidth) / 2;

      for (let col = 0; col < pinsInRow; col++) {
        const x = startX + col * pinSpacing;
        const pin = Bodies.circle(x, y, this.pinRadius, {
          isStatic: true,
          restitution: 0.6,
          friction: 0.0,
          render: {
            fillStyle: '#557086',
          },
          label: 'pin',
        });
        this.pins.push(pin);
      }
    }

    // Walls
    const wallThickness = 20;
    const leftWall = Bodies.rectangle(-wallThickness / 2, this.height / 2, wallThickness, this.height, {
      isStatic: true, render: { visible: false },
    });
    const rightWall = Bodies.rectangle(this.width + wallThickness / 2, this.height / 2, wallThickness, this.height, {
      isStatic: true, render: { visible: false },
    });

    // Bucket dividers
    this.bucketPositions = [];
    const slotCount = this.rows + 1;
    const bottomRowPins = this.rows + 2;
    const bottomRowWidth = (bottomRowPins - 1) * pinSpacing;
    const slotWidth = bottomRowWidth / slotCount;
    const lastRowStartX = (this.width - bottomRowWidth) / 2;

    const dividers = [];
    for (let i = 0; i <= slotCount; i++) {
      const x = lastRowStartX + i * slotWidth;
      const divider = Bodies.rectangle(x, this.height - 20, 3, 30, {
        isStatic: true,
        render: { fillStyle: 'rgba(85, 112, 134, 0.3)' },
        label: 'divider',
      });
      dividers.push(divider);
    }

    for (let i = 0; i < slotCount; i++) {
      this.bucketPositions.push(lastRowStartX + i * slotWidth + slotWidth / 2);
    }

    const floor = Bodies.rectangle(this.width / 2, this.height + 10, this.width + 100, 20, {
      isStatic: true, render: { visible: false }, label: 'floor',
    });

    Composite.add(this.engine.world, [
      ...this.pins, leftWall, rightWall, ...dividers, floor,
    ]);

    this.slotWidth = slotWidth;
    this.lastRowStartX = lastRowStartX;
    this.slotCount = slotCount;
  }

  _setupCollisionEvents() {
    Events.on(this.engine, 'collisionStart', (event) => {
      event.pairs.forEach(({ bodyA, bodyB }) => {
        if (bodyA.label === 'pin' && bodyB.label === 'ball') this._flashPin(bodyA);
        else if (bodyB.label === 'pin' && bodyA.label === 'ball') this._flashPin(bodyB);
      });
    });

    Events.on(this.engine, 'afterUpdate', () => {
      this.balls = this.balls.filter((ball) => {
        if (ball.position.y >= this.height - 30 && !ball._landed) {
          ball._landed = true;
          const slotIndex = Math.floor((ball.position.x - this.lastRowStartX) / this.slotWidth);
          const clampedIndex = Math.max(0, Math.min(slotIndex, this.slotCount - 1));
          const multiplier = this.getMultipliers()[clampedIndex] || 1;
          if (this.onBallLand) this.onBallLand({ slotIndex: clampedIndex, multiplier });
          setTimeout(() => {
            Composite.remove(this.engine.world, ball);
            this.activeBalls--;
          }, 800);
          return true;
        }
        if (ball.position.y > this.height + 100) {
          Composite.remove(this.engine.world, ball);
          this.activeBalls--;
          return false;
        }
        return true;
      });
    });
  }

  _flashPin(pin) {
    pin.render.fillStyle = '#ffffff';
    clearTimeout(pin._flashTimer);
    pin._flashTimer = setTimeout(() => { pin.render.fillStyle = '#557086'; }, 120);
  }

  dropBall() {
    // Tiny sub-pixel nudge just to break perfect symmetry.
    // ALL meaningful randomness comes from chaotic peg interactions.
    const nudge = (Math.random() - 0.5) * 0.6;
    const x = this.width / 2 + nudge;
    const y = 10;

    const ball = Bodies.circle(x, y, this.ballRadius, {
      restitution: 0.5,
      friction: 0.0,
      frictionAir: 0.015,
      density: 0.005,
      render: {
        fillStyle: '#ff9500',
        lineWidth: 0,
      },
      label: 'ball',
    });

    Body.setVelocity(ball, { x: nudge * 0.1, y: 0.5 });

    ball._landed = false;
    this.balls.push(ball);
    this.activeBalls++;
    Composite.add(this.engine.world, ball);
  }

  getMultipliers() {
    const table = MULTIPLIER_TABLES[this.risk];
    return table ? (table[this.rows] || table[16]) : MULTIPLIER_TABLES.medium[16];
  }

  setRows(rows) { this.rows = rows; this._buildBoard(); }
  setRisk(risk) { this.risk = risk; }

  destroy() {
    Render.stop(this.render);
    Runner.stop(this.runner);
    Engine.clear(this.engine);
    if (this.render.canvas) this.render.canvas.remove();
    this.render.textures = {};
  }
}
