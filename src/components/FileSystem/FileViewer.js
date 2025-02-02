// src/components/FileExplorer.js
import React, { useState, useEffect } from "react";
import FileViewer from "./FileViewer";
import RightClickItem from "../RightClickItem";

const FileExplorer = ({ fileSystem, initialFolder, onOpenFile }) => {
  const [currentFolder, setCurrentFolder] = useState(initialFolder || fileSystem[0]);
  const [selectedFile, setSelectedFile] = useState(null);

  // State for file explorer context menu (for items in the explorer)
  const [explorerContextMenu, setExplorerContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    item: null,
  });

  const openFolder = (folder) => {
    setCurrentFolder(folder);
    setSelectedFile(null);
  };

  // Update the openFile function to check for PDF files.
  const openFile = (file) => {
    // If it's a PDF, call the parent's onOpenFile so it opens as a new window.
    if (file.name.toLowerCase().endsWith(".pdf")) {
      if (onOpenFile) {
        onOpenFile(file);
      }
    } else {
      setSelectedFile(file);
    }
  };

  // Right-click handler for explorer items
  const handleItemContextMenu = (e, item) => {
    e.preventDefault();
    setExplorerContextMenu({ visible: true, x: e.clientX, y: e.clientY, item });
  };

  // Disable right-click on the explorer background
  const disableContextMenu = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const handleClick = () => {
      if (explorerContextMenu.visible) {
        setExplorerContextMenu({ visible: false, x: 0, y: 0, item: null });
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [explorerContextMenu.visible]);

  // Actions for explorer item context menu
  const handleItemOpen = (e) => {
    e.stopPropagation();
    if (explorerContextMenu.item) {
      if (explorerContextMenu.item.type === "folder") {
        openFolder(explorerContextMenu.item);
      } else {
        openFile(explorerContextMenu.item);
      }
    }
    setExplorerContextMenu({ visible: false, x: 0, y: 0, item: null });
  };

  const handleItemRename = (e) => {
    e.stopPropagation();
    if (explorerContextMenu.item) {
      const newName = prompt("Enter new name", explorerContextMenu.item.name);
      if (newName) {
        console.log(`Renamed item ${explorerContextMenu.item.id} to ${newName}`);
        // Update file system accordingly.
      }
    }
    setExplorerContextMenu({ visible: false, x: 0, y: 0, item: null });
  };

  const handleItemDelete = (e) => {
    e.stopPropagation();
    if (explorerContextMenu.item) {
      console.log(`Delete item ${explorerContextMenu.item.id}`);
      // Remove item from file system as needed.
    }
    setExplorerContextMenu({ visible: false, x: 0, y: 0, item: null });
  };

  return (
    <div className="window flex h-full bg-white/80 rounded-lg shadow-lg overflow-hidden" onContextMenu={disableContextMenu}>
      {/* Sidebar */}
      <div className="w-60 border-r border-gray-200 p-4">
        <h2 className="text-xl font-semibold mb-4">{currentFolder.name}</h2>
        <ul className="space-y-2">
          {currentFolder.children?.map((item) => (
            <li key={item.id}>
              <button
                onClick={() =>
                  item.type === "folder" ? openFolder(item) : openFile(item)
                }
                onContextMenu={(e) => handleItemContextMenu(e, item)}
                className="w-full text-left px-2 py-1 hover:bg-blue-50 rounded"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto">
        {selectedFile ? (
          <FileViewer file={selectedFile} />
        ) : (
          <div className="text-gray-500">Select a file to view its content.</div>
        )}
      </div>

      {/* Explorer Item Right-Click Menu */}
      <RightClickItem
        visible={explorerContextMenu.visible}
        x={explorerContextMenu.x}
        y={explorerContextMenu.y}
        handleOpen={handleItemOpen}
        handleRename={handleItemRename}
        handleDelete={handleItemDelete}
      />
    </div>
  );
};

export default FileExplorer;
