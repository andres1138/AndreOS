import React from "react";

/**
 * Small SVG calculator icon — usable as a desktop / Start-menu icon.
 */
const CalculatorIcon = ({ size = 32 }) => {
    const keys = [];
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
            const isOp = col === 3;
            keys.push(
                <rect
                    key={`${row}-${col}`}
                    x={[5.5, 12, 18.5, 24.5][col]}
                    y={14 + row * 5.5}
                    width="4.5"
                    height="4"
                    rx="0.8"
                    fill={row === 2 && isOp ? "#f97316" : isOp ? "#63b3ed" : "#e8eaf6"}
                    opacity={isOp ? 1 : 0.85}
                />
            );
        }
    }

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block", flexShrink: 0 }}
        >
            {/* Body */}
            <rect x="3" y="1.5" width="26" height="29" rx="3" fill="#1a1a2e" stroke="#63b3ed" strokeWidth="1.5" />
            {/* Screen */}
            <rect x="5.5" y="4.5" width="21" height="7" rx="1" fill="#0d1020" stroke="#2a3150" strokeWidth="0.8" />
            <text x="25" y="10.3" textAnchor="end" fontSize="6.5" fontFamily="Courier New, monospace" fill="#63b3ed">42</text>
            {/* Keys */}
            {keys}
        </svg>
    );
};

export default CalculatorIcon;
