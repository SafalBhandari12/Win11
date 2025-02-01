import React, { useState, useEffect } from 'react';
import { Lock, ChevronRight, Wifi, Battery, EyeOff, Eye, ChevronLeft, User } from 'lucide-react';

const LoginScreen = ({ onLogin }) => {
  const users = [
    { id: "User1", name: "User1", pin: "1234" },
    { id: "User2", name: "User2", pin: "5678" }
  ];

  const [time, setTime] = useState(new Date());
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showUserSelect, setShowUserSelect] = useState(false);
  const [selectedUser, setSelectedUser] = useState(users[0]);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      if (password === selectedUser.pin) {
        setError('');
        onLogin(selectedUser.id);
      } else {
        setError('The PIN is incorrect. Try again.');
      }
    }, 1500);
  };

  const switchUser = (user) => {
    setSelectedUser(user);
    setShowUserSelect(false);
    setPassword('');
    setError('');
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col justify-between p-8 text-white overflow-hidden select-none">
      {/* Top Status Bar */}
      <div className="flex justify-end space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <Wifi size={16} />
          <Battery size={16} />
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Center Content */}
      <div className="flex flex-col items-center space-y-8">
        {/* Time */}
        <div className="text-center">
          <div className="text-6xl font-light">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-xl mt-2">
            {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Login Form or User Select */}
        <div className="w-80 mt-8">
          {showUserSelect ? (
            <div className="space-y-4">
              <div className="text-xl text-center mb-6">Select a user</div>
              {users.map((user) => (
                <button
                  key={user.id}
                  onClick={() => switchUser(user)}
                  className="w-full flex items-center space-x-4 p-4 bg-black/30 backdrop-blur-lg rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <User size={24} className="text-gray-600" />
                  </div>
                  <span>{user.name}</span>
                </button>
              ))}
              <button
                onClick={() => setShowUserSelect(false)}
                className="w-full mt-4 text-center text-sm hover:underline"
              >
                <ChevronLeft className="inline mr-1" size={16} />
                Back
              </button>
            </div>
          ) : (
            <div>
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
                  <User size={48} className="text-gray-600" />
                </div>
                <div className="text-xl">{selectedUser.name}</div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/30 backdrop-blur-lg text-white px-4 py-2 rounded-lg pl-10 pr-10 placeholder-gray-400"
                    placeholder="PIN"
                  />
                  <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {error && (
                  <div className="text-red-400 text-sm mt-2">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <span>Sign in</span>
                      <ChevronRight size={18} />
                    </>
                  )}
                </button>
              </form>

              <button
                onClick={() => setShowUserSelect(true)}
                className="w-full mt-4 text-center text-sm hover:underline"
              >
                Switch user
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Options */}
      <div className="flex justify-between items-end">
        <div className="flex space-x-4 text-sm">
          <button className="hover:underline">Accessibility</button>
          <button className="hover:underline">More options</button>
        </div>
        <button className="hover:underline text-sm">
          Sign-in options
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;