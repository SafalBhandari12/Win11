// src/components/CmdApp.js
import React, { useState } from "react";

const CmdApp = () => {
  const [output, setOutput] = useState([]);
  const [command, setCommand] = useState("");

  const handleCommand = (e) => {
    e.preventDefault();
    const trimmed = command.trim();
    if (!trimmed) return;
    let newOutput = [...output, `> ${trimmed}`];

    // Simple command handling:
    if (trimmed === "help") {
      newOutput.push("Available commands: help, clear, echo [message]");
    } else if (trimmed === "clear") {
      newOutput = [];
    } else if (trimmed.startsWith("echo ")) {
      newOutput.push(trimmed.substring(5));
    } else {
      newOutput.push(`Command not recognized: ${trimmed}`);
    }

    setOutput(newOutput);
    setCommand("");
  };

  return (
    <div className="cmd-app h-full bg-black text-green-500 font-mono p-4 overflow-auto">
      <div className="output whitespace-pre-wrap">
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <form onSubmit={handleCommand} className="mt-2 flex items-center">
        <span>{">"}</span>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="bg-black text-green-500 outline-none flex-1 ml-2"
          autoFocus
        />
      </form>
    </div>
  );
};

export default CmdApp;
