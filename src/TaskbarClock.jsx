import React, { useState, useEffect } from "react";

const TaskbarClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return { time: `${hours}:${minutes}:${seconds}`, ampm };
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const { time: timeStr, ampm } = formatTime(time);

    return (
        <div className="taskbar-clock">
            <span className="taskbar-clock__time">{timeStr}</span>
            <span className="taskbar-clock__ampm">{ampm}</span>
            <span className="taskbar-clock__date">{formatDate(time)}</span>
        </div>
    );
};

export default TaskbarClock;

