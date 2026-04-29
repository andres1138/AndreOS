import { useState } from 'react'
import Window from "./Window.jsx";
import Content1 from "./Content1.jsx";
import Profile from './Profile.jsx';
import Plinko from './Plinko.jsx';
import DisplayProperties from "./DisplayProperties.jsx";
import DesktopIcon from "./DesktopIcon.jsx";
import TaskbarClock from "./TaskbarClock.jsx";
import './App.css'

import profileIcon from "./icons/profile_icon.png";
import profile_Icon from "./icons/ProfileIcon.png";
import displayProperties from "./icons/DisplayProperties.png";
import plinkoIcon from "./icons/PlinkoIcon.png";

function App() {
  const [topWindow, setTopWindow] = useState(null);
  const [openWindows, setOpenWindows] = useState([]);
  const [minimized, setMinimized] = useState([]);
  const [background, setBackground] = useState('teal');

  const handleBackgroundChange = (newBackground) => {
    setBackground(newBackground);
  };

  const availableWindows = [
    {
      id: 1,
      title: "Useless Buttons",
      icon: profileIcon,
      content: <Content1 />,
      resizable: true,
      defaultWidth: 400,
      defaultHeight: 300,
      minWidth: 250,
      minHeight: 200,
    },
    {
      id: 2,
      title: "Display Properties",
      icon: displayProperties,
      content: (
        <DisplayProperties
          currentBackground={background}
          onApply={handleBackgroundChange}
          onClose={() => handleClose(2)}
        />
      ),

      resizable: false,
      defaultWidth: 380,
      defaultHeight: 420,
    },
    {
      id: 3,
      title: "My Profile",
      icon: profile_Icon,
      content: <Profile />,
      resizable: true,
      defaultWidth: 520,
      defaultHeight: 400,
      minWidth: 350,
      minHeight: 300,
    },
    {
      id: 4,
      title: "Plinko",
      icon: plinkoIcon,
      content: <Plinko />,
      resizable: true,
      defaultWidth: 850,
      defaultHeight: 600,
      minWidth: 700,
      minHeight: 500,
    },
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
          resizable={window.resizable}
          defaultWidth={window.defaultWidth}
          defaultHeight={window.defaultHeight}
          minWidth={window.minWidth}
          maxWidth={window.maxWidth}
          minHeight={window.minHeight}
          maxHeight={window.maxHeight}
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
                padding: "0px 6px",
                marginRight: "4px",
                border: "1px solid #808080",
                background: "#c0c0c0",
                cursor: "pointer",
                userSelect: "none",
                height: "22px",
                boxSizing: "border-box",
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
