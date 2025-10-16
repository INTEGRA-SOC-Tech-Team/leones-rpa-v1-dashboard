import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch('http://34.60.14.221:3011/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar usuario en localStorage
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        
        // Llamar a la función onLogin
        onLogin(data.usuario);
      } else {
        setError(data.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
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
            
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Usuario</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingresa tu usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Ingresando...
                  </>
                ) : (
                  'Ingresar'
                )}
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