import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Search from './Search';

function Navbar({ loginStatus, activeUser, handleSearch, handleUser }) {
  const [activeName, setActiveName] = useState('');
  const history = useHistory()
  useEffect(() => {
    if (activeUser) {
      fetch('/api/users')
        .then((response) => response.json())
        .then((data) => setActiveName(data.username))
        .catch((error) => console.log('Error: Could not fetch user data:', error));
    }
  }, [activeUser]);
  
  const handleLogout = () => {
    fetch('/api/logout', {
      method : "DELETE",
    }).then(() => {
      handleUser(null);
      history.push('/')
    })
  }

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
                  <NavLink xact to={`/profile/${activeUser}`} className="nav-link">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to={`/profile/${activeUser}`} className="nav-link">
                    {activeName}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="btn btn-primary" onClick={handleLogout}>
                    Logout
                  </button>
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;




