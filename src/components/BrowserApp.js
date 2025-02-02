// src/components/BrowserApp.js
import React, { useState } from "react";

const BrowserApp = ({ initialUrl }) => {
  const [url, setUrl] = useState(initialUrl || "");
  const [inputUrl, setInputUrl] = useState(initialUrl || "");

  const handleGo = () => {
    // When the user clicks “Go,” update the URL displayed in the iframe.
    setUrl(inputUrl);
  };

  return (
    <div className="browser-app flex flex-col h-full">
      {/* Address Bar */}
      <div className="address-bar flex items-center p-2 bg-gray-200 border-b border-gray-300">
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          className="flex-1 p-1 border border-gray-300 rounded"
          placeholder="Enter URL..."
        />
        <button
          onClick={handleGo}
          className="ml-2 px-4 py-1 bg-blue-500 text-white rounded"
        >
          Go
        </button>
      </div>
      {/* Content Area */}
      <div className="content flex-1">
        {url ? (
          <iframe
            src={url}
            title="Browser Content"
            className="w-full h-full border-none"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Enter a URL to browse.
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowserApp;
