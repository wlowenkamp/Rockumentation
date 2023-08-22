import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Search from './Search'; 

function Navbar({ loginStatus, handleLogout, activeUser, handleSearch }) {
  const [activeName, setActiveName] = useState('');

  useEffect(() => {
    if (activeUser) {
      fetch('http://127.0.0.1:5555/api/users')
        .then((r) => r.json())
        .then((data) => setActiveName(data.username))
        .catch((error) => console.log('Error: Could not fetch user data:', error));
    }
  }, [activeUser]);

  return (
    <nav className="nav-bar">
      <div className="nav-bar-container">
        <div className="nav-links-container">
          <NavLink exact to="/" className="nav-links">
            Home
          </NavLink>
          <NavLink exact to="/users" className="nav-links">
            Users
          </NavLink>
          {activeUser ? (
            <NavLink exact to={`/profile/${activeUser}`} className="nav-links">
              {activeName}
            </NavLink>
          ) : null}
        </div>
        {/* Include the Search component */}
        <Search handleSearch={handleSearch} />
        {/* Rest of the Navbar JSX */}
      </div>
    </nav>
  );
}

export default Navbar;
