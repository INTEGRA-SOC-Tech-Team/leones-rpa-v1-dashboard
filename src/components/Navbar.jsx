function Navbar({ onLogout }) {
  return (
    <nav 
      className="navbar navbar-expand-lg navbar-dark w-100" 
      style={{ backgroundColor: "#046B4B", padding: "5px 0" }}
    >
      <div className="container-fluid px-4">
        <a className="navbar-brand d-flex align-items-center" href="#" style={{ margin: 0 }}>
          <img
            src="/nl.png"
            alt="Logo"
            style={{ 
              height: '70px',
              width: 'auto',
              objectFit: 'contain',
              marginLeft : '-40px'
            }}
            className="p-2"
          />
        </a>
        <button
          onClick={onLogout}
          className="btn btn-light btn-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;