import React, { useState, useEffect } from "react";

const TaskbarClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // 0 should be 12

        return `${hours}:${minutes} ${ampm}`;
    };

    return (
        <div className="taskbar-clock">
            {formatTime(time)}
        </div>
    );
};

export default TaskbarClock;
