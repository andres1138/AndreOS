import React, { useState, useRef, useLayoutEffect } from "react";


// Windows 95 window husk with the standard three buttons and optional resizing capabilities.
// Props:
//   resizable     - bool (default true): whether the window can be resized by the user
//   defaultWidth  - number: initial width in px (default 400)
//   defaultHeight - number: initial height in px (default 300)
//   minWidth      - number: minimum resize width (default 200)
//   maxWidth      - number: maximum resize width (default Infinity)
//   minHeight     - number: minimum resize height (default 150)
//   maxHeight     - number: maximum resize height (default Infinity)
const Window = ({
    title,
    children,
    topWindow,
    setTopWindow,
    onClose,
    icon,
    isMinimized,
    onMinimize,
    resizable = true,
    defaultWidth = 400,
    defaultHeight = 300,
    minWidth = 200,
    maxWidth = Infinity,
    minHeight = 150,
    maxHeight = Infinity,
    autoFit = true, // size the window to its content on open (falls back to defaults)
}) => {

    const [width, setWidth] = useState(defaultWidth);
    const [height, setHeight] = useState(defaultHeight);

    const [isMaximized, setIsMaximized] = useState(false);
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const windowRef = useRef(null);

    // On first mount, let the window shrink-wrap its content, measure it, then lock that size in.
    useLayoutEffect(() => {
        const el = windowRef.current;
        if (!autoFit || !el) return;
        const prevW = el.style.width;
        const prevH = el.style.height;
        el.style.width = 'max-content';
        el.style.height = 'auto';
        const w = Math.ceil(el.offsetWidth);
        const h = Math.ceil(el.offsetHeight);
        el.style.width = prevW;
        el.style.height = prevH;
        if (w > 0 && h > 0) {
            setWidth(Math.min(maxWidth, Math.max(minWidth, w)));
            setHeight(Math.min(maxHeight, Math.max(minHeight, h)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onMouseDown = (e) => {
        // Don't drag if the click was on a control button
        if (e.target.closest(".title-bar-controls")) return;

        e.preventDefault();
        setTopWindow(title);

        const startX = e.clientX - position.x;
        const startY = e.clientY - position.y;

        const onMouseMove = (e) => {
            setPosition({
                x: e.clientX - startX,
                y: e.clientY - startY,
            });
        };

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };

    const handleMaximize = () => setIsMaximized(!isMaximized);

    const startResize = (e, direction) => {
        e.stopPropagation();
        e.preventDefault();

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = windowRef.current.offsetWidth;
        const startHeight = windowRef.current.offsetHeight;
        const startPos = { ...position };

        const onMouseMove = (e) => {
            let newWidth = startWidth;
            let newHeight = startHeight;
            let newX = startPos.x;
            let newY = startPos.y;

            if (direction.includes('right')) {
                newWidth = Math.min(maxWidth, Math.max(minWidth, startWidth + (e.clientX - startX)));
            }
            if (direction.includes('left')) {
                const potentialWidth = startWidth - (e.clientX - startX);
                if (potentialWidth >= minWidth && potentialWidth <= maxWidth) {
                    newWidth = potentialWidth;
                    newX = startPos.x + (e.clientX - startX);
                }
            }
            if (direction.includes('bottom')) {
                newHeight = Math.min(maxHeight, Math.max(minHeight, startHeight + (e.clientY - startY)));
            }
            if (direction.includes('top')) {
                const potentialHeight = startHeight - (e.clientY - startY);
                if (potentialHeight >= minHeight && potentialHeight <= maxHeight) {
                    newHeight = potentialHeight;
                    newY = startPos.y + (e.clientY - startY);
                }
            }

            setPosition({ x: newX, y: newY });
            setWidth(newWidth);
            setHeight(newHeight);
        };

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };


    return (
        <div
            ref={windowRef}
            className={`window${topWindow === title ? ' active' : ''}${isMaximized ? ' maximized' : ''}`}
            style={{
                zIndex: topWindow === title ? 10 : 1,
                width: isMaximized ? '100%' : width,
                height: isMaximized ? '100%' : height,
                transform: `translate(${position.x}px, ${position.y}px)`,
                position: 'absolute',
                display: isMinimized ? 'none' : 'flex',
            }}
        >
            {/* Only render resize handles when the window is resizable */}
            {resizable && (
                <>
                    <div className="resize-handle top-left" onMouseDown={(e) => startResize(e, 'top-left')} />
                    <div className="resize-handle top-right" onMouseDown={(e) => startResize(e, 'top-right')} />
                    <div className="resize-handle bottom-left" onMouseDown={(e) => startResize(e, 'bottom-left')} />
                    <div className="resize-handle bottom-right" onMouseDown={(e) => startResize(e, 'bottom-right')} />
                    <div className="resize-handle top" onMouseDown={(e) => startResize(e, 'top')} />
                    <div className="resize-handle bottom" onMouseDown={(e) => startResize(e, 'bottom')} />
                    <div className="resize-handle left" onMouseDown={(e) => startResize(e, 'left')} />
                    <div className="resize-handle right" onMouseDown={(e) => startResize(e, 'right')} />
                </>
            )}

            <div className="title-bar" onMouseDown={onMouseDown}>
                <div className="title-bar-text">{title}</div>
                <div className="title-bar-controls">
                    <button
                        aria-label="Minimize"
                        // prevent drag
                        onMouseDown={(e) => e.stopPropagation()}
                        // trigger minimize
                        onClick={() => onMinimize && onMinimize()}
                    ></button>
                    <button
                        aria-label="Maximize"
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={resizable ? handleMaximize : undefined}
                        disabled={!resizable}
                    ></button>
                    <button
                        aria-label="Close"
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={onClose}
                    ></button>
                </div>

            </div>
            <div className="window-body">{children}</div>
        </div>
    );
};

export default Window;
