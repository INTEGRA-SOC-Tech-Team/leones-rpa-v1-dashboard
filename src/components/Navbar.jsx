function Navbar({ onLogout }) {
  return (
    <nav 
      className="navbar navbar-expand-lg navbar-dark w-100 full-width-navbar" 
      style={{ backgroundColor: "#046B4B" }}
    >
      <div className="container-fluid px-3">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src="/logo.jpg"
            alt="Logo"
            width="62"
            height="40"
            className="me-2"
          />
          Leones Dashboard
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