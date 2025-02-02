
// // src/components/Desktop.js
// import React, { useState, useEffect } from "react";
// import { FaFolderOpen, FaFileAlt } from "react-icons/fa";
// import backgroundImage from "./win11.png";
// import Taskbar from "./Taskbar";
// import RightClick from "./RightClick";
// import RightClickItem from "./RightClickItem";
// import useFileSystem from "./FileSystem/useFileSystem";
// import FileExplorer from "./FileSystem/FileExplorer";
// import FileViewer from "./FileSystem/FileViewer";
// import BrowserApp from "./BrowserApp";
// import CmdApp from "./CmdApp";


// const Desktop = () => {
//   const [pdfUrl, setPdfUrl] = useState("");
//   const [openWindows, setOpenWindows] = useState([]);
//   const [taskbarItems, setTaskbarItems] = useState([]);
//   const { fileSystem, addFileOrFolder } = useFileSystem();
//   // Use the children of the root folder as desktop icons.
//   const items = fileSystem[0].children;

//   // Desktop app items for the Browser and CMD apps.
//   const appItems = [
//     {
//       id: "browser-app",
//       name: "Browser",
//       type: "app",
//       icon: "🌐", // You can use an emoji or replace with a react-icon.
//       appType: "browser",
//       initialUrl: "https://example.com/myfile.pdf",
//     },
//     {
//       id: "cmd-app",
//       name: "Command Prompt",
//       type: "app",
//       icon: "⌨️",
//       appType: "cmd",
//     },
//   ];

//   // Right-click context menu state for the desktop background.
//   const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
//   // Right-click context menu for desktop icons.
//   const [itemContextMenu, setItemContextMenu] = useState({
//     visible: false,
//     x: 0,
//     y: 0,
//     item: null,
//   });

//   // Open a file or folder item in a new window.
//   const handleOpenItem = (item) => {
//     const isFolder = item.type === "folder";
//     const newWindow = {
//       id: item.id,
//       name: item.name,
//       type: item.type,
//       isFullScreen: false,
//       isMinimized: false,
//       position: { x: 100, y: 100 },
//       size: { width: 600, height: 400 },
//       content: isFolder ? (
//         <FileExplorer fileSystem={fileSystem} initialFolder={item} />
//       ) : (
//         <FileViewer file={item} />
//       ),
//     };
//     setOpenWindows((prev) => [...prev, newWindow]);
//     setTaskbarItems((prev) => [
//       ...prev,
//       { id: item.id, name: item.name, type: item.type },
//     ]);
//   };

//   // Open an app (Browser or CMD) in a new window.
//   const handleOpenApp = (app) => {
//     let content;
//     if (app.appType === "browser") {
//       content = <BrowserApp initialUrl={app.initialUrl} />;
//     } else if (app.appType === "cmd") {
//       content = <CmdApp />;
//     }
//     const newWindow = {
//       id: app.id, // Ensure this is unique.
//       name: app.name,
//       type: app.type,
//       isFullScreen: false,
//       isMinimized: false,
//       position: { x: 150, y: 150 },
//       size: { width: 800, height: 600 },
//       content,
//     };
//     setOpenWindows((prev) => [...prev, newWindow]);
//     setTaskbarItems((prev) => [
//       ...prev,
//       { id: newWindow.id, name: newWindow.name, type: newWindow.type },
//     ]);
//   };

//   // When clicking a taskbar item, restore its window if minimized.
//   const handleTaskbarClick = (id) => {
//     const windowItem = openWindows.find((win) => win.id === id);
//     if (windowItem) {
//       setOpenWindows((prev) =>
//         prev.map((win) =>
//           win.id === id ? { ...win, isMinimized: false } : win
//         )
//       );
//     }
//   };

//   // Toggle full-screen mode for a window.
//   const toggleFullScreen = (id) => {
//     setOpenWindows((prev) =>
//       prev.map((win) =>
//         win.id === id
//           ? {
//               ...win,
//               isFullScreen: !win.isFullScreen,
//               position: win.isFullScreen ? { x: 100, y: 100 } : { x: 0, y: 0 },
//               size: win.isFullScreen
//                 ? { width: 600, height: 400 }
//                 : { width: window.innerWidth, height: window.innerHeight },
//             }
//           : win
//       )
//     );
//   };

//   // Minimize a window.
//   const minimizeWindow = (id) => {
//     setOpenWindows((prev) =>
//       prev.map((win) => (win.id === id ? { ...win, isMinimized: true } : win))
//     );
//   };

//   // Close a window and remove it from the taskbar.
//   const closeWindow = (id) => {
//     setOpenWindows((prev) => prev.filter((win) => win.id !== id));
//     setTaskbarItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   // Drag a window by updating its position.
//   const startDrag = (id, e) => {
//     const win = openWindows.find((w) => w.id === id);
//     if (!win || win.isMinimized || win.isFullScreen) return;
//     const offsetX = e.clientX - win.position.x;
//     const offsetY = e.clientY - win.position.y;

//     const handleMouseMove = (e) => {
//       const newX = e.clientX - offsetX;
//       const newY = e.clientY - offsetY;
//       setOpenWindows((prev) =>
//         prev.map((w) =>
//           w.id === id ? { ...w, position: { x: newX, y: newY } } : w
//         )
//       );
//     };

//     const handleMouseUp = () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };

//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//   };

//   // RESIZING FUNCTIONALITY:
//   const handleResizeMouseDown = (id, e) => {
//     e.stopPropagation();
//     const win = openWindows.find((w) => w.id === id);
//     if (!win) return;
//     const startWidth = win.size.width;
//     const startHeight = win.size.height;
//     const startX = e.clientX;
//     const startY = e.clientY;

//     const handleMouseMove = (e) => {
//       const newWidth = startWidth + (e.clientX - startX);
//       const newHeight = startHeight + (e.clientY - startY);
//       setOpenWindows((prev) =>
//         prev.map((w) =>
//           w.id === id
//             ? { ...w, size: { width: newWidth, height: newHeight } }
//             : w
//         )
//       );
//     };

//     const handleMouseUp = () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };

//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//   };

//   // Desktop background right-click handler.
//   const handleContextMenu = (e) => {
//     const target = e.target;
//     if (
//       target.closest(".window") ||
//       target.closest(".taskbar") ||
//       target.closest(".desktop-item")
//     ) {
//       return; // Ignore right-clicks on windows, taskbar, or desktop icons.
//     }
//     e.preventDefault();
//     setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
//   };

//   useEffect(() => {
//     const handleClick = () => {
//       if (contextMenu.visible)
//         setContextMenu({ visible: false, x: 0, y: 0 });
//     };
//     document.addEventListener("click", handleClick);
//     return () => document.removeEventListener("click", handleClick);
//   }, [contextMenu.visible]);

//   // Desktop background context menu actions.
//   const handleRefresh = (e) => {
//     e.stopPropagation();
//     setContextMenu({ visible: false, x: 0, y: 0 });
//     console.log("Refresh triggered");
//   };

//   const handleNewFile = (e) => {
//     e.stopPropagation();
//     setContextMenu({ visible: false, x: 0, y: 0 });
//     console.log("New File clicked");
//   };

//   const handleNewFolder = (e) => {
//     e.stopPropagation();
//     setContextMenu({ visible: false, x: 0, y: 0 });
//     console.log("New Folder clicked");
//   };

//   const handleCommandPrompt = (e) => {
//     e.stopPropagation();
//     setContextMenu({ visible: false, x: 0, y: 0 });
//     console.log("Command Prompt clicked");
//     // Open the CMD app when selecting Command Prompt from the context menu.
//     handleOpenApp({
//       id: "cmd-app",
//       name: "Command Prompt",
//       type: "app",
//       appType: "cmd",
//       icon: "⌨️",
//     });
//   };

//   const handleProperties = (e) => {
//     e.stopPropagation();
//     setContextMenu({ visible: false, x: 0, y: 0 });
//     console.log("Properties clicked");
//   };

//   const handleOpenWithCode = (e) => {
//     e.stopPropagation();
//     setContextMenu({ visible: false, x: 0, y: 0 });
//     console.log("Open with code clicked");
//   };

//   // Icon (desktop item) right-click handler.
//   const handleIconContextMenu = (e, item) => {
//     e.preventDefault();
//     setItemContextMenu({ visible: true, x: e.clientX, y: e.clientY, item });
//   };

//   useEffect(() => {
//     const handleClick = () => {
//       if (itemContextMenu.visible)
//         setItemContextMenu({ visible: false, x: 0, y: 0, item: null });
//     };
//     document.addEventListener("click", handleClick);
//     return () => document.removeEventListener("click", handleClick);
//   }, [itemContextMenu.visible]);

//   const handleIconOpen = (e) => {
//     e.stopPropagation();
//     if (itemContextMenu.item) {
//       handleOpenItem(itemContextMenu.item);
//     }
//     setItemContextMenu({ visible: false, x: 0, y: 0, item: null });
//   };

//   const handleIconRename = (e) => {
//     e.stopPropagation();
//     if (itemContextMenu.item) {
//       const newName = prompt("Enter new name", itemContextMenu.item.name);
//       if (newName) {
//         console.log(`Renamed item ${itemContextMenu.item.id} to ${newName}`);
//         // Update the file system if needed.
//       }
//     }
//     setItemContextMenu({ visible: false, x: 0, y: 0, item: null });
//   };

//   const handleIconDelete = (e) => {
//     e.stopPropagation();
//     if (itemContextMenu.item) {
//       console.log(`Delete item ${itemContextMenu.item.id}`);
//       // Implement deletion logic if needed.
//     }
//     setItemContextMenu({ visible: false, x: 0, y: 0, item: null });
//   };

//   return (
//     <div
//       className="relative h-screen w-full overflow-hidden bg-cover bg-center"
//       style={{ backgroundImage: `url(${backgroundImage})` }}
//       onContextMenu={handleContextMenu}
//     >
//       {/* Desktop Icons */}
//       <div
//         className="absolute top-4 left-4 p-2 space-y-4"
//         onContextMenu={(e) => e.stopPropagation()}
//       >
//         {items.map((item) => (
//           <div
//             key={item.id}
//             className="desktop-item flex flex-col items-center group cursor-pointer p-2 rounded-md hover:bg-blue-50"
//             onClick={() => handleOpenItem(item)}
//             onContextMenu={(e) => handleIconContextMenu(e, item)}
//           >
//             <div className="w-16 h-16 flex items-center justify-center">
//               {item.type === "folder" ? (
//                 <FaFolderOpen className="w-12 h-12 text-yellow-500" />
//               ) : (
//                 <FaFileAlt className="w-12 h-12 text-blue-500" />
//               )}
//             </div>
//             <span className="mt-1 text-sm text-white drop-shadow-md group-hover:text-white">
//               {item.name}
//             </span>
//           </div>
//         ))}
//         {/* Render app icons */}
//         {appItems.map((app) => (
//           <div
//             key={app.id}
//             className="desktop-item flex flex-col items-center group cursor-pointer p-2 rounded-md hover:bg-blue-50"
//             onClick={() => handleOpenApp(app)}
//           >
//             <div className="w-16 h-16 flex items-center justify-center text-2xl">
//               {app.icon}
//             </div>
//             <span className="mt-1 text-sm text-white drop-shadow-md group-hover:text-white">
//               {app.name}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Open Windows */}
//       {openWindows.map((win) => (
//         <div
//           key={win.id}
//           className={`window absolute bg-white rounded-md shadow-md border border-gray-200 ${
//             win.isMinimized ? "hidden" : ""
//           }`}
//           style={{
//             top: win.position.y,
//             left: win.position.x,
//             width: win.isFullScreen ? "100%" : win.size.width,
//             height: win.isFullScreen ? "100%" : win.size.height,
//           }}
//         >
//           <div
//             className="flex justify-between items-center p-2 bg-blue-600 text-white rounded-t-md cursor-move select-none"
//             onMouseDown={(e) => startDrag(win.id, e)}
//           >
//             <span className="font-semibold">{win.name}</span>
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => minimizeWindow(win.id)}
//                 className="hover:bg-blue-500 px-2 rounded"
//               >
//                 _
//               </button>
//               <button
//                 onClick={() => toggleFullScreen(win.id)}
//                 className="hover:bg-blue-500 px-2 rounded"
//               >
//                 {win.isFullScreen ? "❐" : "□"}
//               </button>
//               <button
//                 onClick={() => closeWindow(win.id)}
//                 className="hover:bg-blue-500 px-2 rounded"
//               >
//                 X
//               </button>
//             </div>
//           </div>
//           <div className="window-content h-[calc(100%-40px)] overflow-auto p-2 relative">
//             {win.content}
//             {/* Resize handle (if not full screen) */}
//             {!win.isFullScreen && (
//               <div
//                 className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-blue-600 rounded-br-md"
//                 onMouseDown={(e) => handleResizeMouseDown(win.id, e)}
//               ></div>
//             )}
//           </div>
//         </div>
//       ))}

//       {/* Taskbar */}
//       <Taskbar taskbarItems={taskbarItems} handleTaskbarClick={handleTaskbarClick} />

//       {/* Right-click Context Menus */}
//       <RightClick
//         visible={contextMenu.visible}
//         x={contextMenu.x}
//         y={contextMenu.y}
//         handleRefresh={handleRefresh}
//         handleNewFile={handleNewFile}
//         handleNewFolder={handleNewFolder}
//         handleCommandPrompt={handleCommandPrompt}
//         handleProperties={handleProperties}
//         handleOpenWithCode={handleOpenWithCode}
//       />
//       <RightClickItem
//         visible={itemContextMenu.visible}
//         x={itemContextMenu.x}
//         y={itemContextMenu.y}
//         handleOpen={handleIconOpen}
//         handleRename={handleIconRename}
//         handleDelete={handleIconDelete}
//       />
          
//     </div>
//   );
// };

// export default Desktop;

// // src/components/Desktop.js
import React, { useState, useEffect } from "react";
import { FaFolderOpen, FaFileAlt } from "react-icons/fa";
import backgroundImage from "./win11.png";
import Taskbar from "./Taskbar";
import RightClick from "./RightClick";
import RightClickItem from "./RightClickItem";
import useFileSystem from "./FileSystem/useFileSystem";
import FileExplorer from "./FileSystem/FileExplorer";
import FileViewer from "./FileSystem/FileViewer";
import BrowserApp from "./BrowserApp";
import CmdApp from "./CmdApp";

const Desktop = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [taskbarItems, setTaskbarItems] = useState([]);
  const { fileSystem } = useFileSystem();
  // Use the children of the root folder as desktop icons.
  const items = fileSystem[0].children;

  // Desktop app items for the Browser and CMD apps.
  const appItems = [
    {
      id: "browser-app",
      name: "Browser",
      type: "app",
      icon: "🌐", // You can use an emoji or replace with a react-icon.
      appType: "browser",
      initialUrl: "https://example.com/myfile.pdf",
    },
    {
      id: "cmd-app",
      name: "Command Prompt",
      type: "app",
      icon: "⌨️",
      appType: "cmd",
    },
  ];

  // Right-click context menu state for the desktop background.
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  // Right-click context menu for desktop icons.
  const [itemContextMenu, setItemContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    item: null,
  });

  // Open a file or folder item in a new window.
  const handleOpenItem = (item) => {
    const isFolder = item.type === "folder";
    let content;
    if (isFolder) {
      // In handleOpenItem (for folders)
      content = (
        <FileExplorer
          fileSystem={fileSystem}
          initialFolder={item}
          onOpenFile={handleOpenItem} // Pass the function down
        />
      );

    } else {
      // If the file is a PDF, use the BrowserApp to display it in a new window.
      if (item.name.toLowerCase().endsWith(".pdf")) {
        // Make sure item.uri is a valid URL.
        content = <BrowserApp initialUrl={item.uri} />;
      } else {
        content = <FileViewer file={item} />;
      }

    }

    // Create the new window. For PDFs, we set type as "app" so you can adjust its icon in the taskbar.
    const newWindow = {
      id: item.id,
      name: item.name,
      type: !isFolder && item.name.toLowerCase().endsWith(".pdf") ? "app" : item.type,
      icon: item.icon,
      isFullScreen: false,
      isMinimized: false,
      position: { x: 100, y: 100 },
      size: { width: 600, height: 400 },
      content,
    };

    setOpenWindows((prev) => [...prev, newWindow]);
    setTaskbarItems((prev) => [
      ...prev,
      { id: newWindow.id, name: newWindow.name, type: newWindow.type, icon: newWindow.icon },
    ]);
  };

  // Open an app (Browser or CMD) in a new window.
  const handleOpenApp = (app) => {
    let content;
    if (app.appType === "browser") {
      content = <BrowserApp initialUrl={app.initialUrl} />;
    } else if (app.appType === "cmd") {
      content = <CmdApp />;
    }
    const newWindow = {
      id: app.id,
      name: app.name,
      type: app.type,
      icon: app.icon,
      isFullScreen: false,
      isMinimized: false,
      position: { x: 150, y: 150 },
      size: { width: 800, height: 600 },
      content,
    };
    setOpenWindows((prev) => [...prev, newWindow]);
    setTaskbarItems((prev) => [
      ...prev,
      { id: newWindow.id, name: newWindow.name, type: newWindow.type, icon: newWindow.icon },
    ]);
  };

  // When clicking a taskbar item, restore its window if minimized.
  const handleTaskbarClick = (id) => {
    setOpenWindows((prev) =>
      prev.map((win) =>
        win.id === id ? { ...win, isMinimized: false } : win
      )
    );
  };

  // Toggle full-screen mode for a window.
  const toggleFullScreen = (id) => {
    setOpenWindows((prev) =>
      prev.map((win) =>
        win.id === id
          ? {
              ...win,
              isFullScreen: !win.isFullScreen,
              position: win.isFullScreen ? { x: 100, y: 100 } : { x: 0, y: 0 },
              size: win.isFullScreen
                ? { width: 600, height: 400 }
                : { width: window.innerWidth, height: window.innerHeight },
            }
          : win
      )
    );
  };

  // Minimize a window.
  const minimizeWindow = (id) => {
    setOpenWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, isMinimized: true } : win))
    );
  };

  // Close a window and remove it from the taskbar.
  const closeWindow = (id) => {
    setOpenWindows((prev) => prev.filter((win) => win.id !== id));
    setTaskbarItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Drag a window by updating its position.
  const startDrag = (id, e) => {
    const win = openWindows.find((w) => w.id === id);
    if (!win || win.isMinimized || win.isFullScreen) return;
    const offsetX = e.clientX - win.position.x;
    const offsetY = e.clientY - win.position.y;

    const handleMouseMove = (e) => {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;
      setOpenWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, position: { x: newX, y: newY } } : w
        )
      );
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // RESIZING FUNCTIONALITY:
  const handleResizeMouseDown = (id, e) => {
    e.stopPropagation();
    const win = openWindows.find((w) => w.id === id);
    if (!win) return;
    const startWidth = win.size.width;
    const startHeight = win.size.height;
    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      const newHeight = startHeight + (e.clientY - startY);
      setOpenWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? { ...w, size: { width: newWidth, height: newHeight } }
            : w
        )
      );
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Desktop background right-click handler.
  const handleContextMenu = (e) => {
    const target = e.target;
    if (
      target.closest(".window") ||
      target.closest(".taskbar") ||
      target.closest(".desktop-item")
    ) {
      return; // Ignore right-clicks on windows, taskbar, or desktop icons.
    }
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const handleClick = () => {
      if (contextMenu.visible)
        setContextMenu({ visible: false, x: 0, y: 0 });
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [contextMenu.visible]);

  // Desktop background context menu actions.
  const handleRefresh = (e) => {
    e.stopPropagation();
    setContextMenu({ visible: false, x: 0, y: 0 });
    console.log("Refresh triggered");
  };

  const handleNewFile = (e) => {
    e.stopPropagation();
    setContextMenu({ visible: false, x: 0, y: 0 });
    console.log("New File clicked");
  };

  const handleNewFolder = (e) => {
    e.stopPropagation();
    setContextMenu({ visible: false, x: 0, y: 0 });
    console.log("New Folder clicked");
  };

  const handleCommandPrompt = (e) => {
    e.stopPropagation();
    setContextMenu({ visible: false, x: 0, y: 0 });
    console.log("Command Prompt clicked");
    handleOpenApp({
      id: "cmd-app",
      name: "Command Prompt",
      type: "app",
      appType: "cmd",
      icon: "⌨️",
    });
  };

  const handleProperties = (e) => {
    e.stopPropagation();
    setContextMenu({ visible: false, x: 0, y: 0 });
    console.log("Properties clicked");
  };

  const handleOpenWithCode = (e) => {
    e.stopPropagation();
    setContextMenu({ visible: false, x: 0, y: 0 });
    console.log("Open with code clicked");
  };

  // Icon (desktop item) right-click handler.
  const handleIconContextMenu = (e, item) => {
    e.preventDefault();
    setItemContextMenu({ visible: true, x: e.clientX, y: e.clientY, item });
  };

  useEffect(() => {
    const handleClick = () => {
      if (itemContextMenu.visible)
        setItemContextMenu({ visible: false, x: 0, y: 0, item: null });
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [itemContextMenu.visible]);

  const handleIconOpen = (e) => {
    e.stopPropagation();
    if (itemContextMenu.item) {
      handleOpenItem(itemContextMenu.item);
    }
    setItemContextMenu({ visible: false, x: 0, y: 0, item: null });
  };

  const handleIconRename = (e) => {
    e.stopPropagation();
    if (itemContextMenu.item) {
      const newName = prompt("Enter new name", itemContextMenu.item.name);
      if (newName) {
        console.log(`Renamed item ${itemContextMenu.item.id} to ${newName}`);
      }
    }
    setItemContextMenu({ visible: false, x: 0, y: 0, item: null });
  };

  const handleIconDelete = (e) => {
    e.stopPropagation();
    if (itemContextMenu.item) {
      console.log(`Delete item ${itemContextMenu.item.id}`);
    }
    setItemContextMenu({ visible: false, x: 0, y: 0, item: null });
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      onContextMenu={handleContextMenu}
    >
      {/* Desktop Icons */}
      <div
        className="absolute top-4 left-4 p-2 space-y-4"
        onContextMenu={(e) => e.stopPropagation()}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="desktop-item flex flex-col items-center group cursor-pointer p-2 rounded-md hover:bg-blue-50"
            onClick={() => handleOpenItem(item)}
            onContextMenu={(e) => handleIconContextMenu(e, item)}
          >
            <div className="w-16 h-16 flex items-center justify-center">
              {item.type === "folder" ? (
                <FaFolderOpen className="w-12 h-12 text-yellow-500" />
              ) : (
                <FaFileAlt className="w-12 h-12 text-blue-500" />
              )}
            </div>
            <span className="mt-1 text-sm text-white drop-shadow-md group-hover:text-white">
              {item.name}
            </span>
          </div>
        ))}
        {/* Render app icons */}
        {appItems.map((app) => (
          <div
            key={app.id}
            className="desktop-item flex flex-col items-center group cursor-pointer p-2 rounded-md hover:bg-blue-50"
            onClick={() => handleOpenApp(app)}
          >
            <div className="w-16 h-16 flex items-center justify-center text-2xl">
              {app.icon}
            </div>
            <span className="mt-1 text-sm text-white drop-shadow-md group-hover:text-white">
              {app.name}
            </span>
          </div>
        ))}
      </div>

      {/* Open Windows */}
      {openWindows.map((win) => (
        <div
          key={win.id}
          className={`window absolute bg-white rounded-md shadow-md border border-gray-200 ${
            win.isMinimized ? "hidden" : ""
          }`}
          style={{
            top: win.position.y,
            left: win.position.x,
            width: win.isFullScreen ? "100%" : win.size.width,
            height: win.isFullScreen ? "100%" : win.size.height,
          }}
        >
          <div
            className="flex justify-between items-center p-2 bg-blue-600 text-white rounded-t-md cursor-move select-none"
            onMouseDown={(e) => startDrag(win.id, e)}
          >
            <span className="font-semibold">{win.name}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => minimizeWindow(win.id)}
                className="hover:bg-blue-500 px-2 rounded"
              >
                _
              </button>
              <button
                onClick={() => toggleFullScreen(win.id)}
                className="hover:bg-blue-500 px-2 rounded"
              >
                {win.isFullScreen ? "❐" : "□"}
              </button>
              <button
                onClick={() => closeWindow(win.id)}
                className="hover:bg-blue-500 px-2 rounded"
              >
                X
              </button>
            </div>
          </div>
          <div className="window-content h-[calc(100%-40px)] overflow-auto p-2 relative">
            {win.content}
            {!win.isFullScreen && (
              <div
                className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-blue-600 rounded-br-md"
                onMouseDown={(e) => handleResizeMouseDown(win.id, e)}
              ></div>
            )}
          </div>
        </div>
      ))}

      {/* Taskbar */}
      <Taskbar taskbarItems={taskbarItems} handleTaskbarClick={handleTaskbarClick} />

      {/* Right-click Context Menus */}
      <RightClick
        visible={contextMenu.visible}
        x={contextMenu.x}
        y={contextMenu.y}
        handleRefresh={handleRefresh}
        handleNewFile={handleNewFile}
        handleNewFolder={handleNewFolder}
        handleCommandPrompt={handleCommandPrompt}
        handleProperties={handleProperties}
        handleOpenWithCode={handleOpenWithCode}
      />
      <RightClickItem
        visible={itemContextMenu.visible}
        x={itemContextMenu.x}
        y={itemContextMenu.y}
        handleOpen={handleIconOpen}
        handleRename={handleIconRename}
        handleDelete={handleIconDelete}
      />
    </div>
  );
};

export default Desktop;
