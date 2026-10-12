import React, { useState, useRef, useLayoutEffect } from "react";


// Viewport helpers — keep windows usable on small (mobile) screens.
const TASKBAR_HEIGHT = 48;
const VIEWPORT_MARGIN = 8;
const MOBILE_BREAKPOINT = 640;
const getViewport = () => ({
    w: window.innerWidth,
    h: window.innerHeight - TASKBAR_HEIGHT,
});

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

    // Effective size limits: never larger than the screen, and the minimums give way on small screens.
    const getLimits = () => {
        const vp = getViewport();
        const maxW = Math.min(maxWidth, vp.w - VIEWPORT_MARGIN * 2);
        const maxH = Math.min(maxHeight, vp.h - VIEWPORT_MARGIN * 2);
        return {
            minW: Math.min(minWidth, maxW),
            maxW,
            minH: Math.min(minHeight, maxH),
            maxH,
        };
    };
    const clampSize = (w, h) => {
        const l = getLimits();
        return {
            w: Math.min(l.maxW, Math.max(l.minW, w)),
            h: Math.min(l.maxH, Math.max(l.minH, h)),
        };
    };

    const initialSize = clampSize(defaultWidth, defaultHeight);
    const [width, setWidth] = useState(initialSize.w);
    const [height, setHeight] = useState(initialSize.h);

    const [isMaximized, setIsMaximized] = useState(false);
    const [position, setPosition] = useState(() => {
        const vp = getViewport();
        // On phones, center horizontally near the top; on desktop keep the classic 100/100 offset.
        if (vp.w < MOBILE_BREAKPOINT) {
            return { x: Math.max(VIEWPORT_MARGIN, (vp.w - initialSize.w) / 2), y: VIEWPORT_MARGIN };
        }
        return { x: 100, y: 100 };
    });
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
            const size = clampSize(w, h);
            setWidth(size.w);
            setHeight(size.h);
            const vp = getViewport();
            if (vp.w < MOBILE_BREAKPOINT) {
                setPosition({ x: Math.max(VIEWPORT_MARGIN, (vp.w - size.w) / 2), y: VIEWPORT_MARGIN });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Keep enough of the title bar on screen that the window can always be grabbed again.
    const clampPosition = (x, y, w) => {
        const vp = getViewport();
        const grab = 80;
        return {
            x: Math.min(vp.w - grab, Math.max(grab - w, x)),
            y: Math.min(vp.h - 40, Math.max(0, y)),
        };
    };

    // Attach move/up listeners for a pointer gesture (mouse, touch or pen).
    const trackPointer = (onMove) => {
        const onUp = () => {
            document.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerup", onUp);
            document.removeEventListener("pointercancel", onUp);
        };
        document.addEventListener("pointermove", onMove);
        document.addEventListener("pointerup", onUp);
        document.addEventListener("pointercancel", onUp);
    };

    const onTitlePointerDown = (e) => {
        // Don't drag if the click was on a control button
        if (e.target.closest(".title-bar-controls")) return;
        if (e.pointerType === "mouse" && e.button !== 0) return;

        e.preventDefault();
        setTopWindow(title);
        if (isMaximized) return;

        const startX = e.clientX - position.x;
        const startY = e.clientY - position.y;
        const w = windowRef.current.offsetWidth;

        trackPointer((ev) => {
            setPosition(clampPosition(ev.clientX - startX, ev.clientY - startY, w));
        });
    };

    const handleMaximize = () => setIsMaximized(!isMaximized);

    const startResize = (e, direction) => {
        e.stopPropagation();
        e.preventDefault();
        setTopWindow(title);

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = windowRef.current.offsetWidth;
        const startHeight = windowRef.current.offsetHeight;
        const startPos = { ...position };
        const { minW, maxW, minH, maxH } = getLimits();

        trackPointer((e) => {
            let newWidth = startWidth;
            let newHeight = startHeight;
            let newX = startPos.x;
            let newY = startPos.y;

            if (direction.includes('right')) {
                newWidth = Math.min(maxW, Math.max(minW, startWidth + (e.clientX - startX)));
            }
            if (direction.includes('left')) {
                const potentialWidth = startWidth - (e.clientX - startX);
                if (potentialWidth >= minW && potentialWidth <= maxW) {
                    newWidth = potentialWidth;
                    newX = startPos.x + (e.clientX - startX);
                }
            }
            if (direction.includes('bottom')) {
                newHeight = Math.min(maxH, Math.max(minH, startHeight + (e.clientY - startY)));
            }
            if (direction.includes('top')) {
                const potentialHeight = startHeight - (e.clientY - startY);
                if (potentialHeight >= minH && potentialHeight <= maxH) {
                    newHeight = potentialHeight;
                    newY = startPos.y + (e.clientY - startY);
                }
            }

            setPosition({ x: newX, y: newY });
            setWidth(newWidth);
            setHeight(newHeight);
        });
    };

    // Stop control-button presses from starting a drag
    const stopDrag = (e) => e.stopPropagation();

    return (
        <div
            ref={windowRef}
            className={`window${topWindow === title ? ' active' : ''}${isMaximized ? ' maximized' : ''}`}
            // Tapping/clicking anywhere in a window brings it to the front
            onPointerDown={() => topWindow !== title && setTopWindow(title)}
            style={{
                zIndex: topWindow === title ? 10 : 1,
                width: isMaximized ? '100%' : width,
                height: isMaximized ? `calc(100% - ${TASKBAR_HEIGHT}px)` : height,
                transform: isMaximized ? 'none' : `translate(${position.x}px, ${position.y}px)`,
                position: 'absolute',
                display: isMinimized ? 'none' : 'flex',
            }}
        >
            {/* Only render resize handles when the window is resizable */}
            {resizable && !isMaximized && (
                <>
                    <div className="resize-handle top-left" onPointerDown={(e) => startResize(e, 'top-left')} />
                    <div className="resize-handle top-right" onPointerDown={(e) => startResize(e, 'top-right')} />
                    <div className="resize-handle bottom-left" onPointerDown={(e) => startResize(e, 'bottom-left')} />
                    <div className="resize-handle bottom-right" onPointerDown={(e) => startResize(e, 'bottom-right')} />
                    <div className="resize-handle top" onPointerDown={(e) => startResize(e, 'top')} />
                    <div className="resize-handle bottom" onPointerDown={(e) => startResize(e, 'bottom')} />
                    <div className="resize-handle left" onPointerDown={(e) => startResize(e, 'left')} />
                    <div className="resize-handle right" onPointerDown={(e) => startResize(e, 'right')} />
                </>
            )}

            <div className="title-bar" onPointerDown={onTitlePointerDown} onDoubleClick={resizable ? handleMaximize : undefined}>
                <div className="title-bar-text">{title}</div>
                <div className="title-bar-controls">
                    <button
                        aria-label="Minimize"
                        // prevent drag
                        onPointerDown={stopDrag}
                        // trigger minimize
                        onClick={() => onMinimize && onMinimize()}
                    ></button>
                    <button
                        aria-label="Maximize"
                        onPointerDown={stopDrag}
                        onClick={resizable ? handleMaximize : undefined}
                        disabled={!resizable}
                    ></button>
                    <button
                        aria-label="Close"
                        onPointerDown={stopDrag}
                        onClick={onClose}
                    ></button>
                </div>

            </div>
            <div className="window-body">{children}</div>
        </div>
    );
};

export default Window;
