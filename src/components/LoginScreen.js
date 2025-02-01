import React, { useState, useEffect } from "react";
import { Wifi, Battery, User, Power, Accessibility } from "lucide-react";
import axios from "axios";

// Import the local image
import backgroundImage from "./windows10.jpg";

const LoginScreen = ({ onLogin }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    e?.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Send login request to the backend
      const response = await axios.post(
        "http://localhost:8000/api/auth/login/",
        {
          username,
          password,
        }
      );

      // If login is successful, call the onLogin callback with the token
      if (response.data.token) {
        setError("");
        onLogin(response.data.token); // Pass the token to the parent component
      }
    } catch (error) {
      // Handle login errors
      console.error("Login error:", error);
      setError("Invalid username or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className='relative h-screen w-full overflow-hidden cursor-default'
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
        <div className='text-white text-8xl font-extralight tracking-tighter'>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div className='text-white/90 text-2xl font-light mt-2'>
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
        <div className='flex flex-col items-center space-y-6'>
          <div className='w-32 h-32 rounded-full bg-gradient-to-b from-gray-100 to-gray-300 shadow-lg flex items-center justify-center'>
            <User size={64} className='text-gray-600' />
          </div>
          <h1 className='text-white text-2xl font-light'>Welcome</h1>

          {/* Sign in button or password input */}
          <div className='w-80'>
            {showPassword ? (
              <form onSubmit={handleSubmit} className='space-y-4'>
                {/* Username Input */}
                <input
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='w-full bg-white/10 backdrop-blur text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-white/30'
                  placeholder='Enter Username'
                  autoFocus
                />
                {/* Password Input */}
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full bg-white/10 backdrop-blur text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-white/30'
                  placeholder='Enter Password'
                />
                {/* Error Message */}
                {error && (
                  <div className='text-red-400 text-sm mt-2'>{error}</div>
                )}
                {/* Submit Button */}
                <button
                  type='submit'
                  disabled={isLoading}
                  className='w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg backdrop-blur-sm transition-colors'
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowPassword(true)}
                className='w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg backdrop-blur-sm transition-colors'
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>

      {/* System Controls - Both Screens */}
      <div className='absolute bottom-0 left-0 right-0 h-16 bg-black/20 backdrop-blur-sm'>
        <div className='max-w-screen-xl mx-auto h-full px-6 flex justify-between items-center'>
          {showLogin ? (
            <>
              {/* System Icons */}
              <div className='flex items-center space-x-6'>
                <button className='p-2 rounded-full hover:bg-white/10 transition-colors'>
                  <Wifi className='w-5 h-5 text-white opacity-80' />
                </button>

                <button className='p-2 rounded-full hover:bg-white/10 transition-colors'>
                  <Power className='w-5 h-5 text-white opacity-80' />
                </button>
              </div>
            </>
          ) : (
            // Lock Screen System Icons
            <div className='ml-auto flex items-center space-x-6'>
              <Wifi className='w-5 h-5 text-white opacity-80' />
              <Battery className='w-5 h-5 text-white opacity-80' />
              <Accessibility className='w-5 h-5 text-white opacity-80' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;