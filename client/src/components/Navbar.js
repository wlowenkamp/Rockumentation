import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Search from './Search';

function Navbar({ loginStatus, handleLogout, activeUser, handleSearch }) {
  const [activeName, setActiveName] = useState('');

  useEffect(() => {
    if (activeUser) {
      fetch('http://127.0.0.1:5555/api/users')
        .then((response) => response.json())
        .then((data) => setActiveName(data.username))
        .catch((error) => console.log('Error: Could not fetch user data:', error));
    }
  }, [activeUser]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink exact to="/" className="navbar-brand">
          Home
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink exact to="/users" className="nav-link">
                Users
              </NavLink>
            </li>
            {activeUser ? (
              <>
                <li className="nav-item">
                  <NavLink exact to="/collections" className="nav-link">
                    Collections
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to={`/profile/${activeUser}`} className="nav-link">
                    {activeName}
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink exact to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/signup" className="nav-link">
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="ml-auto">
          <Search handleSearch={handleSearch} />
          {loginStatus ? (
            <button className="btn btn-primary" onClick={handleLogout}>
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;






