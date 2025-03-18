import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const authLinks = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">
          <i className="fas fa-columns"></i> Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/components">
          <i className="fas fa-puzzle-piece"></i> Components
        </Link>
      </li>
      <li className="nav-item">
        <a href="#!" onClick={logout} className="nav-link">
          <i className="fas fa-sign-out-alt"></i> Logout
        </a>
      </li>
      {user && (
        <li className="user-welcome">
          <i className="fas fa-user-circle"></i> {user.name}
        </li>
      )}
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          <i className="fas fa-user-plus"></i> Register
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          <i className="fas fa-sign-in-alt"></i> Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <i className="fas fa-layer-group"></i> Server-Driven UI
        </Link>
      </div>
      <div className="navbar-menu">
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </nav>
  );
};

export default Navbar; 