import React, { useState, useEffect, useRef } from "react";
import "./StartMenu.css";

const StartMenu = ({ availableWindows, onOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // Close menu on outside click
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener("pointerdown", handleOutsideClick);
        }
        return () => document.removeEventListener("pointerdown", handleOutsideClick);
    }, [isOpen]);

    const handleItemClick = (win) => {
        onOpen(win);
        setIsOpen(false);
    };

    return (
        <div className="start-menu-wrapper" ref={menuRef}>
            {/* Start Button */}
            <button
                className={`start-button ${isOpen ? "active" : ""}`}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <span className="start-flag">
                    {/* Placeholder: simple monitor icon */}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="2" width="14" height="9" rx="1" fill="#444" stroke="#222" strokeWidth="0.5"/>
                        <rect x="2" y="3" width="12" height="7" fill="#7ec8e3"/>
                        <rect x="6" y="11" width="4" height="1.5" fill="#555"/>
                        <rect x="4" y="12.5" width="8" height="1" rx="0.5" fill="#444"/>
                    </svg>
                </span>
                <span className="start-label">Start</span>
            </button>

            {/* Start Menu Popup */}
            {isOpen && (
                <div className="start-menu">
                    <div className="start-menu-sidebar">
                        <span className="start-menu-sidebar-text">AndreOS</span>
                    </div>
                    <div className="start-menu-list">
                        <div className="start-menu-section-label">Applications</div>
                        {availableWindows.map((win) => (
                            <button
                                key={win.id}
                                className="start-menu-item"
                                onClick={() => handleItemClick(win)}
                            >
                                {win.iconComponent
                                    ? <div className="start-menu-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>{win.iconComponent}</div>
                                    : <img src={win.icon} alt={win.title} className="start-menu-icon" />
                                }
                                <span>{win.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StartMenu;
