

import React, { useState, useEffect } from "react";
import { Wifi, Battery, User, Power } from "lucide-react";
import axios from "axios";

// Import the local image
import backgroundImage from "./windows10.jpg";

const LoginScreen = ({ onLogin }) => {
  const [time, setTime] = useState(new Date());
  const [password, setPassword] = useState("");
  const [selectedUser, setSelectedUser] = useState({ name: "hp_123" }); // Default user is hp_123
  const [showLogin, setShowLogin] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPowerMenuOpen, setIsPowerMenuOpen] = useState(false); // Track Power menu state

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScreenClick = () => {
    if (!showLogin) {
      setShowLogin(true);
    }
  };

  useEffect(() => {
    const handleKeyPress = () => {
      if (!showLogin) {
        setShowLogin(true);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Send login request to the backend
      const response = await axios.post(
        "http://localhost:8000/api/auth/login/",
        {
          username: selectedUser?.name,
          password,
        }
      );

      // If login is successful, pass the token to the parent component
      if (response.data.token) {
        onLogin(response.data.token);
        setPassword("");
        setError("");
      }
    } catch (error) {
      // Handle login errors
      console.log(error);
      setError("Invalid username or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePowerClick = () => {
    setIsPowerMenuOpen(!isPowerMenuOpen); // Toggle power menu visibility
  };

  const handlePowerAction = (action) => {
    console.log(action); // This will log the action; replace with actual logic for Sleep, Shutdown, Restart
    setIsPowerMenuOpen(false); // Close the power menu after action
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden cursor-default"
      onClick={handleScreenClick}
      style={{
        backgroundImage: `url(${backgroundImage})`, // Use the local image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Lock Screen */}
      <div
        className={`absolute inset-0 flex flex-col justify-center items-center transition-all duration-700 ${
          showLogin
            ? "opacity-0 translate-y-10 pointer-events-none"
            : "opacity-100"
        }`}
      >
        {/* Time and Date */}
        <div className="text-white text-8xl font-extralight tracking-tighter">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div className="text-white/90 text-2xl font-light mt-2">
          {time.toLocaleDateString([], {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Login Screen */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
          showLogin
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        {/* User Profile */}
        <div className="flex flex-col items-center space-y-6">
          <div className="w-32 h-32 rounded-full bg-gradient-to-b from-gray-100 to-gray-300 shadow-lg flex items-center justify-center">
            <User size={64} className="text-gray-600" />
          </div>
          <h1 className="text-white text-2xl font-light">
            {selectedUser.name}
          </h1>

          {/* PIN Input */}
          <div className="w-80">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 backdrop-blur text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Enter PIN"
                autoFocus
              />
              {error && <div className="text-red-400 text-sm">{error}</div>}
            </form>
          </div>
        </div>
      </div>

      {/* System Controls - Both Screens */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-black/20 backdrop-blur-sm">
        <div className="max-w-screen-xl mx-auto h-full px-6 flex justify-between items-center">
          {showLogin ? (
            <>
              {/* User List - Displayed Vertically, Scrollable */}
              <div className="flex flex-col items-start space-y-2 overflow-y-auto h-auto pb-6">
                {["hp_123", "User2"].map((user) => (
                  <button
                    key={user}
                    onClick={() => setSelectedUser({ name: user })}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      selectedUser?.name === user
                        ? "bg-white/10"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-b from-gray-100 to-gray-300 flex items-center justify-center">
                      <User size={16} className="text-gray-600" />
                    </div>
                    <span className="text-white text-sm">{user}</span>
                  </button>
                ))}
              </div>

              {/* System Icons */}
              <div className="flex items-center space-x-6">
                <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                  <Wifi className="w-5 h-5 text-white opacity-80" />
                </button>

                <button
                  onClick={handlePowerClick}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <Power className="w-5 h-5 text-white opacity-80" />
                </button>
              </div>

              {/* Power Menu Dropdown */}
              {isPowerMenuOpen && (
                <div className="absolute right-6 bottom-16 bg-black/70 text-white rounded-md p-2 space-y-2 w-40">
                  <button
                    onClick={() => handlePowerAction("Sleep")}
                    className="w-full text-left p-2 rounded-md hover:bg-white/10"
                  >
                    Sleep
                  </button>
                  <button
                    onClick={() => handlePowerAction("Power Off")}
                    className="w-full text-left p-2 rounded-md hover:bg-white/10"
                  >
                    Power Off
                  </button>
                  <button
                    onClick={() => handlePowerAction("Restart")}
                    className="w-full text-left p-2 rounded-md hover:bg-white/10"
                  >
                    Restart
                  </button>
                </div>
              )}
            </>
          ) : (
            // Lock Screen System Icons
            <div className="ml-auto flex items-center space-x-6">
              <Wifi className="w-5 h-5 text-white opacity-80" />
              <Battery className="w-5 h-5 text-white opacity-80" />              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
