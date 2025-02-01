import React, { useState } from "react";

const App = () => {
  // State to manage open folders/files
  const [openWindows, setOpenWindows] = useState([]);

  // Sample folders and files
  const items = [
    { id: 1, name: "Folder 1", type: "folder" },
    { id: 2, name: "Folder 2", type: "folder" },
    { id: 3, name: "File 1.txt", type: "file" },
    { id: 4, name: "File 2.docx", type: "file" },
  ];

  // Function to handle opening a folder/file
  const handleOpenItem = (item) => {
    const newWindow = {
      ...item,
      isFullScreen: true, // Open in full screen by default
      isMinimized: false,
      position: { x: 0, y: 0 }, // Full screen starts at (0, 0)
      size: { width: window.innerWidth, height: window.innerHeight }, // Full screen size
    };
    setOpenWindows([...openWindows, newWindow]);
  };

  // Function to toggle full screen
  const toggleFullScreen = (id) => {
    setOpenWindows(
      openWindows.map((window) =>
        window.id === id
          ? {
              ...window,
              isFullScreen: !window.isFullScreen,
              position: window.isFullScreen
                ? { x: 100, y: 100 }
                : { x: 0, y: 0 }, // Reset position when exiting full screen
              size: window.isFullScreen
                ? { width: 400, height: 300 }
                : { width: window.innerWidth, height: window.innerHeight },
            }
          : window
      )
    );
  };

  // Function to minimize a window
  const minimizeWindow = (id) => {
    setOpenWindows(
      openWindows.map((window) =>
        window.id === id ? { ...window, isMinimized: true } : window
      )
    );
  };

  // Function to close a window
  const closeWindow = (id) => {
    setOpenWindows(openWindows.filter((window) => window.id !== id));
  };

  // Function to handle window resizing
  const handleResize = (id, newSize) => {
    setOpenWindows(
      openWindows.map((window) =>
        window.id === id ? { ...window, size: newSize } : window
      )
    );
  };

  // Function to handle window positioning
  const handleDrag = (id, newPosition) => {
    setOpenWindows(
      openWindows.map((window) =>
        window.id === id ? { ...window, position: newPosition } : window
      )
    );
  };

  return (
    <div className='h-screen bg-teal-900 text-white overflow-hidden'>
      {/* Desktop Icons */}
      <div className='flex flex-col items-start p-5'>
        {items.map((item) => (
          <div
            key={item.id}
            className='flex flex-col items-center mb-5 cursor-pointer'
            onClick={() => handleOpenItem(item)}
          >
            <div
              className={`w-12 h-12 ${
                item.type === "folder" ? "bg-yellow-400" : "bg-white"
              } border border-black`}
            ></div>
            <div className='mt-1 text-center'>{item.name}</div>
          </div>
        ))}
      </div>

      {/* Open Windows */}
      {openWindows.map((window) => (
        <div
          key={window.id}
          className={`absolute bg-gray-300 border-2 border-black ${
            window.isMinimized ? "hidden" : ""
          }`}
          style={{
            top: window.position.y,
            left: window.position.x,
            width: window.isFullScreen ? "100%" : window.size.width,
            height: window.isFullScreen ? "100%" : window.size.height,
            zIndex: openWindows.indexOf(window) + 1, // Ensure the latest window is on top
          }}
        >
          {/* Window Header */}
          <div
            className='flex justify-between items-center p-1 bg-blue-900 text-white cursor-move'
            onMouseDown={(e) => {
              const startX = e.clientX;
              const startY = e.clientY;
              const startLeft = window.position.x;
              const startTop = window.position.y;

              // Bind the window's drag to the document, not the window object
              const handleMouseMove = (e) => {
                const newX = startLeft + (e.clientX - startX);
                const newY = startTop + (e.clientY - startY);
                handleDrag(window.id, { x: newX, y: newY });
              };

              const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
              };

              document.addEventListener("mousemove", handleMouseMove);
              document.addEventListener("mouseup", handleMouseUp);
            }}
          >
            <span>{window.name}</span>
            <div className='flex space-x-2'>
              <button
                className='text-white cursor-pointer'
                onClick={() => minimizeWindow(window.id)}
              >
                _
              </button>
              <button
                className='text-white cursor-pointer'
                onClick={() => toggleFullScreen(window.id)}
              >
                {window.isFullScreen ? "❐" : "□"}
              </button>
              <button
                className='text-white cursor-pointer'
                onClick={() => closeWindow(window.id)}
              >
                X
              </button>
            </div>
          </div>

          {/* Window Content */}
          <div className='p-2 text-black'>
            {window.type === "folder" ? (
              <p>This is a folder. Add your content here.</p>
            ) : (
              <p>This is a file. Add your content here.</p>
            )}
          </div>

          {/* Resize Handle */}
          {!window.isFullScreen && (
            <div
              className='absolute bottom-0 right-0 w-3 h-3 bg-blue-900 cursor-se-resize'
              onMouseDown={(e) => {
                const startX = e.clientX;
                const startY = e.clientY;
                const startWidth = window.size.width;
                const startHeight = window.size.height;

                const handleMouseMove = (e) => {
                  const newWidth = startWidth + (e.clientX - startX);
                  const newHeight = startHeight + (e.clientY - startY);
                  handleResize(window.id, {
                    width: newWidth,
                    height: newHeight,
                  });
                };

                const handleMouseUp = () => {
                  document.removeEventListener("mousemove", handleMouseMove);
                  document.removeEventListener("mouseup", handleMouseUp);
                };

                document.addEventListener("mousemove", handleMouseMove);
                document.addEventListener("mouseup", handleMouseUp);
              }}
            ></div>
          )}
        </div>
      ))}

      {/* Taskbar */}
      <div className='fixed bottom-0 left-0 w-full bg-gray-300 flex p-1 border-t-2 border-black'>
        {openWindows.map((window) => (
          <div
            key={window.id}
            className='mr-2 p-1 bg-blue-900 text-white cursor-pointer'
            onClick={() =>
              setOpenWindows(
                openWindows.map((w) =>
                  w.id === window.id ? { ...w, isMinimized: !w.isMinimized } : w
                )
              )
            }
          >
            {window.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
