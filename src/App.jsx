import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Verificar si hay una sesión guardada al cargar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUser(JSON.parse(usuarioGuardado));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (usuario) => {
    setIsLoggedIn(true);
    setUser(usuario);
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div className="h-100">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;