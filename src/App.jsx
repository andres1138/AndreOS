import { useState } from 'react'
import Window from "./Window.jsx";
import Content1 from "./Content1.jsx";
import Profile from './Profile.jsx';
import DisplayProperties from "./DisplayProperties.jsx";
import DesktopIcon from "./DesktopIcon.jsx";
import TaskbarClock from "./TaskbarClock.jsx";
import './App.css'

import profileIcon from "./icons/profile_icon.png";

function App() {
  const [topWindow, setTopWindow] = useState(null);
  const [openWindows, setOpenWindows] = useState([]);
  const [minimized, setMinimized] = useState([]);
  const [background, setBackground] = useState('teal');

  const handleBackgroundChange = (newBackground) => {
    setBackground(newBackground);
  };

  const availableWindows = [
    { id: 1, title: "Useless Buttons", icon: profileIcon, content: <Content1 /> },
    {
      id: 2,
      title: "Display Properties",
      icon: profileIcon,
      content: (
        <DisplayProperties
          currentBackground={background}
          onApply={handleBackgroundChange}
          onClose={() => handleClose(2)}
        />
      )
    },

    { id: 1, title: "My Profile", icon: profileIcon, content: <Profile /> }

  ];


  const handleOpenWindow = (win) => {
    if (!openWindows.find((w) => w.id === win.id)) {
      setOpenWindows([...openWindows, win]);
    }
    setMinimized(minimized.filter((id) => id !== win.id));
  };

  const handleClose = (id) => {
    setOpenWindows(openWindows.filter((w) => w.id !== id));
    setMinimized(minimized.filter((mid) => mid !== id));
  };

  const handleMinimize = (id) => {
    if (!minimized.includes(id)) setMinimized([...minimized, id]);
  };

  const handleRestore = (id) => {
    setMinimized(minimized.filter((mid) => mid !== id));
  };

  return (
    <div className="desktop" style={{ background: background }}>
      {/* Desktop Icons */}
      {availableWindows.map((win, idx) => (
        <DesktopIcon
          key={win.id}
          title={win.title}
          icon={win.icon}
          // 100px apart horizontally
          initialX={20 + idx * 100}
          // same top row
          initialY={20}
          onDoubleClick={() => handleOpenWindow(win)}
        />
      ))}


      {openWindows.map((window) => (
        <Window
          key={window.id}
          title={window.title}
          icon={window.icon}
          topWindow={topWindow}
          setTopWindow={setTopWindow}
          onClose={() => handleClose(window.id)}
          onMinimize={() => handleMinimize(window.id)}
          isMinimized={minimized.includes(window.id)}
        >
          {window.content}
        </Window>
      ))}


      {/* Taskbar */}
      <div className="taskbar">
        {minimized.map((id) => {
          const win = availableWindows.find((w) => w.id === id);
          if (!win) return null;


          return (
            <div
              key={id}
              onClick={() => handleRestore(id)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "2px 6px",
                marginRight: "4px",
                border: "2px outset #fff", // 3D Windows 95 button effect
                background: "#c0c0c0",
                cursor: "pointer",
                userSelect: "none",
                height: "32px",
              }}
            >
              <img
                src={win.icon}
                alt={win.title}
                style={{ width: 20, height: 20, marginRight: 4 }}
              />
              <span style={{ fontSize: "12px" }}>{win.title}</span>
            </div>
          );
        })}
        <TaskbarClock />
      </div>
    </div>
  );
};



export default App
