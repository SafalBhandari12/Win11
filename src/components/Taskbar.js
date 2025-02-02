// src/components/Taskbar.js
import React from "react";
import { FaWindows, FaSpotify, FaEdge, FaMusic, FaWhatsapp, FaFolderOpen, FaFileAlt, FaFilePdf } from "react-icons/fa";
import { Wifi, Volume2, Battery, Mic } from "lucide-react";

const Taskbar = ({ taskbarItems, handleTaskbarClick }) => {
  return (
    <div className="taskbar fixed bottom-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-xl shadow-lg border-t border-white/70 flex items-center justify-center space-x-6">
      <button className="p-2 rounded-md hover:bg-white/10">
        <FaWindows className="w-7 h-7 text-black" />
      </button>
      <button className="p-2 rounded-md hover:bg-white/10">
        <FaEdge className="w-7 h-7 text-blue-600" />
      </button>
      <button className="p-2 rounded-md hover:bg-white/10">
        <FaMusic className="w-7 h-7 text-purple-500" />
      </button>
      <button className="p-2 rounded-md hover:bg-white/10">
        <FaWhatsapp className="w-7 h-7 text-green-400" />
      </button>
      <button className="p-2 rounded-md hover:bg-white/10">
        <FaSpotify className="w-7 h-7 text-green-500" />
      </button>

      {/* Taskbar Icons */}
      <div className="flex space-x-4">
        {taskbarItems.map((item) => (
          <button
            key={item.id}
            className="p-2 rounded-md hover:bg-white/10"
            onClick={() => handleTaskbarClick(item.id)}
          >
            {item.type === "file" ? (
            <FaFileAlt className="w-7 h-7 text-gray-600" />
          ) : item.type === "folder" ? (
            <FaFolderOpen className="w-7 h-7 text-yellow-500" />
          ) : item.type === "app" ? (
            // Check if the name ends with ".pdf" only if needed.
            item.name.toLowerCase().endsWith(".pdf") ? (
              <FaFilePdf className="w-7 h-7 text-red-500" />
            ) : (
              <span className="text-2xl">{item.icon}</span>
            )
          ) : null}
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="fixed bottom-2 right-4 flex items-center space-x-4 text-black pb-0">
        <Wifi className="w-5 h-5" />
        <Volume2 className="w-5 h-5" />
        <Battery className="w-5 h-5" />
        <Mic className="w-5 h-5" />
        <div className="flex flex-col items-end ml-4">
          <div className="text-sm">
            {new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </div>
          <div className="text-sm">
            {new Date().toLocaleDateString("en-US", {
              month: "numeric",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;

