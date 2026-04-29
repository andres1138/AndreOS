import { useState, useRef, useEffect, useCallback } from 'react';
import './Plinko.css';
import PlinkoEngine from './PlinkoEngine';

const RISK_OPTIONS = ['low', 'medium', 'high'];
const ROW_OPTIONS = [8, 12, 16];

const Plinko = () => {
    const canvasRef = useRef(null);
    const engineRef = useRef(null);

    const [rows, setRows] = useState(16);
    const [risk, setRisk] = useState('medium');
    const [betAmount, setBetAmount] = useState(1.00);
    const [balance, setBalance] = useState(1000.00);
    const [totalProfit, setTotalProfit] = useState(0);
    const [totalBets, setTotalBets] = useState(0);
    const [lastResults, setLastResults] = useState([]);
    const [multipliers, setMultipliers] = useState([]);
    const [hitSlot, setHitSlot] = useState(null);

    const handleBallLand = useCallback(({ slotIndex, multiplier }) => {
        const winAmount = betAmount * multiplier;
        const profit = winAmount - betAmount;

        setBalance((b) => b + winAmount);
        setTotalProfit((p) => p + profit);
        setLastResults((prev) => [
            { multiplier, profit, id: Date.now() },
            ...prev.slice(0, 9),
        ]);
        setHitSlot(slotIndex);
        setTimeout(() => setHitSlot(null), 500);
    }, [betAmount]);

    // Initialize engine
    useEffect(() => {
        if (!canvasRef.current) return;

        // Clear container first
        canvasRef.current.innerHTML = '';

        const engine = new PlinkoEngine(canvasRef.current, {
            rows,
            risk,
            onBallLand: handleBallLand,
        });

        engineRef.current = engine;
        setMultipliers(engine.getMultipliers());

        return () => {
            engine.destroy();
            engineRef.current = null;
        };
    }, [rows, risk, handleBallLand]);

    const handleDrop = () => {
        if (!engineRef.current) return;
        if (betAmount > balance) return;

        setBalance((b) => b - betAmount);
        setTotalBets((t) => t + 1);
        engineRef.current.dropBall();
    };

    const handleRowsChange = (e) => {
        setRows(Number(e.target.value));
    };

    const handleRiskChange = (r) => {
        setRisk(r);
    };

    const halfBet = () => setBetAmount((b) => Math.max(0.01, +(b / 2).toFixed(2)));
    const doubleBet = () => setBetAmount((b) => Math.min(balance, +(b * 2).toFixed(2)));

    const getMultiplierTier = (mult, multipliersList) => {
        const max = Math.max(...multipliersList);
        const ratio = mult / max;
        if (ratio >= 0.8) return 'tier-0';
        if (ratio >= 0.4) return 'tier-1';
        if (ratio >= 0.15) return 'tier-2';
        if (ratio >= 0.05) return 'tier-3';
        return 'tier-4';
    };

    return (
        <div className="plinko-app">
            {/* SIDEBAR */}
            <div className="sidebar">
                <div className="sidebar-header">
                    <div className="logo-icon">⬥</div>
                    <h2>Plinko</h2>
                </div>

                {/* Tabs */}
                <div className="tabs">
                    <button className="tab active">Manual</button>
                    <button className="tab">Auto</button>
                </div>

                {/* Bet Amount */}
                <div className="control-group">
                    <label className="control-label">Bet Amount</label>
                    <div className="control-input-wrapper">
                        <input
                            className="control-input"
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={betAmount}
                            onChange={(e) => setBetAmount(Math.max(0.01, +e.target.value))}
                        />
                        <button className="input-btn" onClick={halfBet}>½</button>
                        <button className="input-btn" onClick={doubleBet}>2×</button>
                    </div>
                </div>

                {/* Risk */}
                <div className="control-group">
                    <label className="control-label">Risk</label>
                    <div className="risk-selector">
                        {RISK_OPTIONS.map((r) => (
                            <button
                                key={r}
                                className={`risk-btn ${risk === r ? 'active' : ''}`}
                                onClick={() => handleRiskChange(r)}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Rows */}
                <div className="control-group">
                    <label className="control-label">Rows</label>
                    <div className="rows-selector">
                        <select
                            className="rows-select"
                            value={rows}
                            onChange={handleRowsChange}
                        >
                            {ROW_OPTIONS.map((r) => (
                                <option key={r} value={r}>{r} rows</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Drop Button */}
                <button
                    className="bet-button"
                    onClick={handleDrop}
                    disabled={betAmount > balance}
                >
                    Drop Ball
                </button>

                {/* Stats */}
                <div className="stats-section">
                    <div className="stat-row">
                        <span className="stat-label">Balance</span>
                        <span className="stat-value">${balance.toFixed(2)}</span>
                    </div>
                    <div className="stat-row">
                        <span className="stat-label">Total Bets</span>
                        <span className="stat-value">{totalBets}</span>
                    </div>
                    <div className="stat-row">
                        <span className="stat-label">Total Profit</span>
                        <span className={`stat-value ${totalProfit >= 0 ? 'positive' : 'negative'}`}>
                            {totalProfit >= 0 ? '+' : ''}{totalProfit.toFixed(2)}
                        </span>
                    </div>

                    {lastResults.length > 0 && (
                        <div className="control-group">
                            <span className="stat-label">Last Drops</span>
                            <div className="last-results">
                                {lastResults.map((r) => (
                                    <span
                                        key={r.id}
                                        className={`result-chip ${r.profit >= 0 ? 'win' : 'lose'}`}
                                    >
                                        {r.multiplier}×
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* GAME AREA */}
            <div className="game-area">
                <div className="canvas-container" ref={canvasRef} />

                {/* Multiplier Row */}
                <div className="multiplier-row">
                    {multipliers.map((m, i) => (
                        <div
                            key={i}
                            className={`multiplier-slot ${getMultiplierTier(m, multipliers)} ${hitSlot === i
                                ? 'hit' : ''}`}
                        >
                            {m}×
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Plinko;