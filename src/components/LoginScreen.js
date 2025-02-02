import React, { useState, useEffect } from "react";
import { Wifi, Battery, User, Power, Eye, EyeOff } from "lucide-react";
import axios from "axios";

import backgroundImage from "./windows10.jpg";

const LoginScreen = ({ onLogin }) => {
  const [time, setTime] = useState(new Date());
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ name: "hp_123" });
  const [showLogin, setShowLogin] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPowerMenuOpen, setIsPowerMenuOpen] = useState(false);

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
      const response = await axios.post(
        "http://localhost:8000/api/auth/login/",
        {
          username: selectedUser?.name,
          password,
        }
      );

      if (response.data.token) {
        onLogin(response.data.token);
        setPassword("");
        setError("");
      }
    } catch (error) {
      console.log(error);
      setError("Invalid username or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePowerClick = () => {
    setIsPowerMenuOpen(!isPowerMenuOpen);
  };

  const handlePowerAction = (action) => {
    console.log(action);
    setIsPowerMenuOpen(false);
  };

  return (
    <div
      className='relative h-screen w-full overflow-hidden cursor-default'
      onClick={handleScreenClick}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className={`absolute inset-0 flex flex-col justify-center items-center transition-all duration-700 ${
          showLogin
            ? "opacity-0 translate-y-10 pointer-events-none"
            : "opacity-100"
        }`}
      >
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

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
          showLogin
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <div className='flex flex-col items-center space-y-6'>
          <div className='w-32 h-32 rounded-full bg-gradient-to-b from-gray-100 to-gray-300 shadow-lg flex items-center justify-center'>
            <User size={64} className='text-gray-600' />
          </div>
          <h1 className='text-white text-2xl font-light'>
            {selectedUser.name}
          </h1>

          <div className='w-80 relative'>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full bg-white/10 backdrop-blur text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-white/30'
                  placeholder='Enter PIN'
                  autoFocus
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-white opacity-80 hover:opacity-100'
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {error && <div className='text-red-400 text-sm'>{error}</div>}
            </form>
          </div>
        </div>
      </div>

      <div className='absolute bottom-0 left-0 right-0 h-16 bg-black/20 backdrop-blur-sm'>
        <div className='max-w-screen-xl mx-auto h-full px-6 flex justify-between items-center'>
          {showLogin ? (
            <>
              <div className='flex flex-col items-start space-y-2 overflow-y-auto h-auto pb-6'>
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
                    <div className='w-8 h-8 rounded-full bg-gradient-to-b from-gray-100 to-gray-300 flex items-center justify-center'>
                      <User size={16} className='text-gray-600' />
                    </div>
                    <span className='text-white text-sm'>{user}</span>
                  </button>
                ))}
              </div>
              <div className='flex items-center space-x-6'>
                <button
                  onClick={handlePowerClick}
                  className='p-2 rounded-full hover:bg-white/10 transition-colors'
                >
                  <Power className='w-5 h-5 text-white opacity-80' />
                </button>
              </div>
            </>
          ) : (
            <div className='ml-auto flex items-center space-x-6'>
              <Wifi className='w-5 h-5 text-white opacity-80' />
              <Battery className='w-5 h-5 text-white opacity-80' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
