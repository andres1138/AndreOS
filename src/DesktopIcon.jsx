import React, { useState, useRef } from "react";

// Movement (px) beyond which a press counts as a drag rather than a tap.
const TAP_SLOP = 6;

const DesktopIcon = ({ id, title, icon, iconComponent, isSelected, onSelect, onDoubleClick, initialX, initialY }) => {
    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const [isPressed, setIsPressed] = useState(false);
    const iconRef = useRef(null);

    // Pointer events cover mouse, touch and pen with one code path.
    const handlePointerDown = (e) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        // Prevent default browser text selection / scrolling while allowing custom drag/click
        e.preventDefault();
        e.stopPropagation();

        if (onSelect) {
            onSelect(id);
        }
        setIsPressed(true);

        const start = { x: e.clientX, y: e.clientY };
        const offset = { x: e.clientX - position.x, y: e.clientY - position.y };
        const isTouch = e.pointerType !== "mouse";
        let moved = false;

        const onPointerMove = (ev) => {
            if (!moved && Math.hypot(ev.clientX - start.x, ev.clientY - start.y) > TAP_SLOP) {
                moved = true;
            }
            if (!moved) return;

            // Keep the icon inside the desktop area
            const el = iconRef.current;
            const parent = el?.parentElement;
            const maxX = parent ? parent.clientWidth - el.offsetWidth : Infinity;
            const maxY = parent ? parent.clientHeight - el.offsetHeight : Infinity;
            setPosition({
                x: Math.max(0, Math.min(maxX, ev.clientX - offset.x)),
                y: Math.max(0, Math.min(maxY, ev.clientY - offset.y)),
            });
        };

        const onPointerUp = (ev) => {
            document.removeEventListener("pointermove", onPointerMove);
            document.removeEventListener("pointerup", onPointerUp);
            document.removeEventListener("pointercancel", onPointerUp);
            setIsPressed(false);

            // On touch screens a single tap opens the app (double-tap is unreliable on mobile).
            if (isTouch && !moved && ev.type === "pointerup" && onDoubleClick) {
                onDoubleClick();
            }
        };

        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", onPointerUp);
        document.addEventListener("pointercancel", onPointerUp);
    };

    return (
        <div
            ref={iconRef}
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
            onPointerDown={handlePointerDown}
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={(e) => {
                e.stopPropagation();
                if (onDoubleClick) {
                    onDoubleClick();
                }
            }}
        >
            <div className="icon-wrapper">
                {iconComponent
                    ? <div className="icon-image" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>{iconComponent}</div>
                    : <img src={icon} alt={title} className="icon-image" draggable={false} />
                }
            </div>
            <div className="icon-title">{title}</div>
        </div>
    );
};

export default DesktopIcon;
