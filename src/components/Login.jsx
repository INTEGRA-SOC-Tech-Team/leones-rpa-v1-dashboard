import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        
        {/* Lado izquierdo - login */}
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
          <div className="p-5 shadow rounded login-box bg-white w-75">
            <div className="text-center mb-4">
              <img src="/logo.jpg" alt="Logo SOC" width="50" className="mb-2" />
              <h2 className="text-primary fw-bold">SOC | Leones Dashboard</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Usuario</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="broker"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-success w-100">
                Ingresar
              </button>
            </form>
          </div>
        </div>

        {/* Lado derecho - imagen ilustrativa */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-primary">
          <img
            src="/main.jpg"
            alt="Ilustración SOC"
            className="img-fluid p-4 rounded shadow-lg"
            style={{ maxHeight: "80%" }}
          />
        </div>

      </div>
    </div>
  );
}

export default Login;
