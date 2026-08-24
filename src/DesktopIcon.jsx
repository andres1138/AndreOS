import React, { useState, useEffect, useRef } from "react";

const DesktopIcon = ({ id, title, icon, isSelected, onSelect, onDoubleClick, initialX, initialY }) => {
    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const [dragging, setDragging] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const dragStartPos = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        // Prevent default browser text selection while allowing custom drag/click
        e.preventDefault();
        e.stopPropagation();

        if (onSelect) {
            onSelect(id);
        }
        setIsPressed(true);
        setDragging(true);
        dragStartPos.current = { x: e.clientX, y: e.clientY };
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
        setIsPressed(false);
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
    }, [dragging, offset]);

    return (
        <div
            className={`desktop-icon ${isSelected ? "selected" : ""} ${isPressed ? "pressed" : ""}`}
            style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                width: 76,
                textAlign: "center",
                cursor: "default",
                userSelect: "none",
            }}
            onMouseDown={handleMouseDown}
            onDoubleClick={(e) => {
                e.stopPropagation();
                if (onDoubleClick) {
                    onDoubleClick();
                }
            }}
        >
            <div className="icon-wrapper">
                <img src={icon} alt={title} className="icon-image" draggable={false} />
            </div>
            <div className="icon-title">{title}</div>
        </div>
    );
};

export default DesktopIcon;

