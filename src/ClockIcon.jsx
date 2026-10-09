import React, { useState, useEffect } from "react";

/**
 * A tiny live SVG analog clock — usable as a desktop / Start-menu icon.
 * Ticks every second using its own independent interval.
 */
const ClockIcon = ({ size = 32 }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const cx = size / 2;
    const cy = size / 2;
    const r  = size / 2 - 1;

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours   = time.getHours() % 12;

    const secondDeg = (seconds / 60) * 360;
    const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hourDeg   = (hours   / 12) * 360 + (minutes / 60) * 30;

    // Convert angle (0 = 12 o'clock) + radius to x,y
    const tip = (deg, len) => {
        const rad = (deg - 90) * (Math.PI / 180);
        return { x: cx + Math.cos(rad) * len, y: cy + Math.sin(rad) * len };
    };

    const hourEnd   = tip(hourDeg,   r * 0.50);
    const minuteEnd = tip(minuteDeg, r * 0.70);
    const secondEnd = tip(secondDeg, r * 0.80);

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block", flexShrink: 0 }}
        >
            {/* Face */}
            <circle cx={cx} cy={cy} r={r} fill="#1a1a2e" stroke="#63b3ed" strokeWidth="1.5" />

            {/* Hour tick marks */}
            {Array.from({ length: 12 }).map((_, i) => {
                const rad = ((i / 12) * 360 - 90) * (Math.PI / 180);
                const isMajor = i % 3 === 0;
                const inner = r * (isMajor ? 0.78 : 0.84);
                const outer = r * 0.93;
                return (
                    <line
                        key={i}
                        x1={cx + Math.cos(rad) * inner}
                        y1={cy + Math.sin(rad) * inner}
                        x2={cx + Math.cos(rad) * outer}
                        y2={cy + Math.sin(rad) * outer}
                        stroke="#63b3ed"
                        strokeWidth={isMajor ? 1.5 : 0.8}
                        opacity={isMajor ? 0.9 : 0.45}
                    />
                );
            })}

            {/* Hour hand */}
            <line
                x1={cx} y1={cy}
                x2={hourEnd.x} y2={hourEnd.y}
                stroke="#e8eaf6" strokeWidth="2.2" strokeLinecap="round"
            />
            {/* Minute hand */}
            <line
                x1={cx} y1={cy}
                x2={minuteEnd.x} y2={minuteEnd.y}
                stroke="#63b3ed" strokeWidth="1.5" strokeLinecap="round"
            />
            {/* Second hand */}
            <line
                x1={cx} y1={cy}
                x2={secondEnd.x} y2={secondEnd.y}
                stroke="#f97316" strokeWidth="1" strokeLinecap="round"
            />
            {/* Center pin */}
            <circle cx={cx} cy={cy} r="2" fill="#f97316" />
        </svg>
    );
};

export default ClockIcon;
