import React, { useState, useEffect } from "react";

const DesktopIcon = ({ title, icon, onDoubleClick, initialX, initialY }) => {
    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        e.preventDefault();
        setDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        setPosition({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        });
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    useEffect(() => {
        if (dragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        } else {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging]);

    return (
        <div
            className="desktop-icon"
            style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                width: 70,
                textAlign: "center",
                cursor: "default",
                userSelect: "none",
            }}
            onMouseDown={handleMouseDown}
            onDoubleClick={onDoubleClick}
        >
            <img src={icon} alt={title} style={{ width: 32, height: 32 }} />
            <div style={{ fontSize: "12px", marginTop: "4px" }}>{title}</div>
        </div>
    );
};

export default DesktopIcon;
