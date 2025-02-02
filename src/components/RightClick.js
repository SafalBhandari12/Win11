
// src/components/RightClick.js
import React from "react";

const RightClick = ({
  visible,
  x,
  y,
  handleRefresh,
  handleNewFile,
  handleNewFolder,
  handleCommandPrompt,
  handleProperties,
  handleOpenWithCode,
}) => {
  if (!visible) return null;

  return (
    <div
      style={{ top: y, left: x }}
      className="absolute bg-white rounded-md shadow-lg py-1 text-sm z-50 border border-gray-200"
    >
      <div
        className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
        onClick={handleRefresh}
      >
        Refresh
      </div>
      <div className="relative group">
        <div className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex justify-between items-center">
          New <span className="ml-2">&gt;</span>
        </div>
        <div className="absolute left-full top-0 hidden group-hover:block bg-white shadow-md rounded-md py-1 min-w-[150px] border border-gray-200">
          <div
            className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
            onClick={handleNewFile}
          >
            File
          </div>
          <div
            className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
            onClick={handleNewFolder}
          >
            Folder
          </div>
        </div>
      </div>
      <div
        className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
        onClick={handleCommandPrompt}
      >
        Command prompt
      </div>
      <div
        className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
        onClick={handleProperties}
      >
        Properties
      </div>
      <div
        className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
        onClick={handleOpenWithCode}
      >
        Open with code
      </div>
    </div>
  );
};

export default RightClick;
