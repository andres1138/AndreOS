import { useState } from 'react'
import Window from "./Window.jsx";
import Contact from './Contact.jsx';
import Portfolio from './Portfolio.jsx';
import Plinko from './Plinko.jsx';
import Clock from './Clock.jsx';
import ClockIcon from './ClockIcon.jsx';
import Calculator from './Calculator.jsx';
import CalculatorIcon from './CalculatorIcon.jsx';
import DisplayProperties from "./DisplayProperties.jsx";
import DesktopIcon from "./DesktopIcon.jsx";
import TaskbarClock from "./TaskbarClock.jsx";
import StartMenu from "./StartMenu.jsx";
import './App.css'

import profile_Icon from "./icons/ProfileIconNew.png";
import contact_icon from "./icons/contact.png"
import displayProperties from "./icons/DisplayPropertiesNew.png";
import plinkoIcon from "./icons/PlinkoIcon.png";

function App() {
  const [topWindow, setTopWindow] = useState(null);
  const [openWindows, setOpenWindows] = useState([]);
  const [minimized, setMinimized] = useState([]);
  const [background, setBackground] = useState('teal');
  const [selectedIconId, setSelectedIconId] = useState(null);

  const handleBackgroundClick = () => {
    setSelectedIconId(null);
  };

  const handleBackgroundChange = (newBackground) => {
    setBackground(newBackground);
  };

  const availableWindows = [
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
      title: "Resume",
      icon: profile_Icon,
      content: <Portfolio />,
      resizable: true,
      defaultWidth: 840,
      defaultHeight: 600,
      minWidth: 400,
      minHeight: 300,
      maxHeight: window.innerHeight - 140,
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
    {
      id: 5,
      title: "Contact",
      icon: contact_icon,
      content: <Contact />,
      resizable: true,
      defaultWidth: 760,
      defaultHeight: 560,
      minWidth: 400,
      minHeight: 300,
      maxHeight: window.innerHeight - 140,
    },
    {
      id: 6,
      title: "Clock",
      icon: null,
      iconComponent: <ClockIcon size={32} />,
      content: <Clock />,
      resizable: true,
      defaultWidth: 380,
      defaultHeight: 420,
      minWidth: 320,
      minHeight: 360,
    },
    {
      id: 7,
      title: "Calculator",
      icon: null,
      iconComponent: <CalculatorIcon size={32} />,
      content: <Calculator />,
      resizable: true,
      defaultWidth: 300,
      defaultHeight: 420,
      minWidth: 240,
      minHeight: 340,
    },
  ];


  // How many 100px icon slots fit across the screen (wraps into rows on phones)
  const iconCols = Math.max(1, Math.floor((window.innerWidth - 20) / 100));

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
    <div className="desktop" style={{ background: background }} onClick={handleBackgroundClick}>
      {/* Desktop Icons */}
      {availableWindows.map((win, idx) => (
        <DesktopIcon
          key={win.id}
          id={win.id}
          title={win.title}
          icon={win.icon}
          iconComponent={win.iconComponent}
          isSelected={selectedIconId === win.id}
          onSelect={(id) => setSelectedIconId(id)}
          initialX={20 + (idx % iconCols) * 100}
          initialY={20 + Math.floor(idx / iconCols) * 100}
          onDoubleClick={() => {
            setSelectedIconId(win.id);
            handleOpenWindow(win);
          }}
        />
      ))}

      {openWindows.map((window) => (
        <Window
          key={window.id}
          title={window.title}
          icon={window.icon}
          iconComponent={window.iconComponent}
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
        <StartMenu availableWindows={availableWindows} onOpen={handleOpenWindow} />
        <div className="taskbar-divider" />
        {minimized.map((id) => {
          const win = availableWindows.find((w) => w.id === id);
          if (!win) return null;

          return (
            <div
              key={id}
              className="taskbar-item"
              onClick={() => handleRestore(id)}
            >
              <div className="taskbar-item-icon">
                {win.iconComponent
                  ? win.iconComponent
                  : <img src={win.icon} alt={win.title} />
                }
              </div>
              <span>{win.title}</span>
            </div>
          );
        })}
        <TaskbarClock />
      </div>
    </div>
  );
};



export default App
