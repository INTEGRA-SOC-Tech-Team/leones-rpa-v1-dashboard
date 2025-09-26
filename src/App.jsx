import React, { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  const handleLogin = (username, password) => {
    if (username === "admin" && password === "broker") {
      setIsLoggedIn(true);
      setUser(username);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="h-100">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} />
      )}
    </div>
  );
}

export default App;
