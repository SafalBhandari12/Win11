import React, { useState, useEffect } from "react";
import {
  Lock,
  ChevronRight,
  Wifi,
  Battery,
  EyeOff,
  Eye,
  User,
} from "lucide-react";
import axios from "axios";

const LoginScreen = ({ onLogin }) => {
  const [time, setTime] = useState(new Date());
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      console.log(error);
      setError("Invalid username or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='h-screen w-full bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col justify-between p-8 text-white overflow-hidden select-none'>
      {/* Top Status Bar */}
      <div className='flex justify-end space-x-4 text-sm'>
        <div className='flex items-center space-x-2'>
          <Wifi size={16} />
          <Battery size={16} />
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>

      {/* Center Content */}
      <div className='flex flex-col items-center space-y-8'>
        {/* Time */}
        <div className='text-center'>
          <div className='text-6xl font-light'>
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div className='text-xl mt-2'>
            {time.toLocaleDateString([], {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Login Form */}
        <div className='w-80 mt-8'>
          <div>
            <div className='flex flex-col items-center mb-6'>
              <div className='w-24 h-24 bg-gray-300 rounded-full mb-4 flex items-center justify-center'>
                <User size={48} className='text-gray-600' />
              </div>
              <div className='text-xl'>Welcome</div>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* Username Input */}
              <div className='relative'>
                <input
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='w-full bg-black/30 backdrop-blur-lg text-white px-4 py-2 rounded-lg pl-10 pr-10 placeholder-gray-400'
                  placeholder='Username'
                />
                <User
                  className='absolute left-3 top-2.5 text-gray-400'
                  size={18}
                />
              </div>

              {/* Password Input */}
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full bg-black/30 backdrop-blur-lg text-white px-4 py-2 rounded-lg pl-10 pr-10 placeholder-gray-400'
                  placeholder='Password'
                />
                <Lock
                  className='absolute left-3 top-2.5 text-gray-400'
                  size={18}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-2.5 text-gray-400 hover:text-white'
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className='text-red-400 text-sm mt-2'>{error}</div>
              )}

              {/* Submit Button */}
              <button
                type='submit'
                disabled={isLoading}
                className='w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg flex items-center justify-center space-x-2'
              >
                {isLoading ? (
                  <div className='animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent' />
                ) : (
                  <>
                    <span>Sign in</span>
                    <ChevronRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Options */}
      <div className='flex justify-between items-end'>
        <div className='flex space-x-4 text-sm'>
          <button className='hover:underline'>Accessibility</button>
          <button className='hover:underline'>More options</button>
        </div>
        <button className='hover:underline text-sm'>Sign-in options</button>
      </div>
    </div>
  );
};

export default LoginScreen;
