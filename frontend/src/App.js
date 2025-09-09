import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import LanguageSwitcher from "./LanguageSwitcher";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userInfo) => {
    setUser(userInfo);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // ✅ useEffect is now inside App
  useEffect(() => {
    const syncSubmissions = async () => {
      // Your function from Step 3 that syncs local submissions to backend
    };

    syncSubmissions();
    window.addEventListener("online", syncSubmissions);

    return () => window.removeEventListener("online", syncSubmissions);
  }, []);

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      <LanguageSwitcher />
      <Dashboard user={user} onLogout={handleLogout} />
    </div>
  );
}

export default App;
