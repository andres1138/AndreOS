import React, { useEffect, useRef } from "react";
import "./Clock.css";

const ROMAN_NUMERALS = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

const Clock = () => {
    const secondHandRef = useRef(null);
    const minuteHandRef = useRef(null);
    const hourHandRef   = useRef(null);

    const setDate = () => {
        const now  = new Date();

        const seconds    = now.getSeconds();
        const mins       = now.getMinutes();
        const hour       = now.getHours();

        const secondsDeg = (seconds / 60) * 360 + 90;
        const minsDeg    = (mins / 60) * 360 + (seconds / 60) * 6 + 90;
        const hoursDeg   = (hour / 12) * 360 + (mins / 60) * 30 + 90;

        if (secondHandRef.current)
            secondHandRef.current.style.transform = `rotate(${secondsDeg}deg)`;
        if (minuteHandRef.current)
            minuteHandRef.current.style.transform = `rotate(${minsDeg}deg)`;
        if (hourHandRef.current)
            hourHandRef.current.style.transform = `rotate(${hoursDeg}deg)`;
    };

    useEffect(() => {
        setDate(); // run immediately on mount
        const id = setInterval(setDate, 1000);
        return () => clearInterval(id); // cleanup on unmount
    }, []);

    return (
        <div className="clock">
            {/* Roman numeral markers */}
            {ROMAN_NUMERALS.map((numeral, i) => {
                const angle = (i / 12) * 360 - 90;
                const rad = (angle * Math.PI) / 180;
                const radius = 40; // % from center
                const x = 50 + radius * Math.cos(rad);
                const y = 50 + radius * Math.sin(rad);
                return (
                    <span
                        key={numeral}
                        className="clock-numeral"
                        style={{ left: `${x}%`, top: `${y}%` }}
                    >
                        {numeral}
                    </span>
                );
            })}

            {/* Tick marks */}
            {Array.from({ length: 60 }).map((_, i) => (
                <div
                    key={i}
                    className={`clock-tick ${i % 5 === 0 ? "clock-tick--major" : "clock-tick--minor"}`}
                    style={{ transform: `rotate(${i * 6}deg)` }}
                />
            ))}

            <div className="clock-face">
                <div className="hand hour-hand"   ref={hourHandRef} />
                <div className="hand min-hand"    ref={minuteHandRef} />
                <div className="hand second-hand" ref={secondHandRef} />
                <div className="clock-center-outer" />
                <div className="clock-center" />
            </div>
        </div>
    );
};

export default Clock;
