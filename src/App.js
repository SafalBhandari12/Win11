import React, { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import Desktop from "./components/Desktop";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username); // Set the logged-in user
    setIsLoggedIn(true); // Set the login state to true
  };

  return (
    <div className="h-screen w-screen">
      {isLoggedIn ? (
        <Desktop user={user} /> // Pass the logged-in user to Desktop component
      ) : (
        <LoginScreen onLogin={handleLogin} /> // Pass the handleLogin function to LoginScreen
      )}
    </div>
  );
};

export default App;
