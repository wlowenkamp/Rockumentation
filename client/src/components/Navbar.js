import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Search from './Search';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar({ loginStatus, user, handleSearch, handleUser }) {
  const history = useHistory();

  const handleLogout = () => {
    fetch('/api/logout', {
      method: 'DELETE',
    })
      .then(() => {
        handleUser(null);
        history.push('/');
        toast.success('Logout successful!');
      })
      .catch((error) => {
        console.error('Error logging out:', error);
        toast.error('An error occurred during logout.');
      });
  };

  const navbarStyle = {
    backgroundColor: '#FAC840',
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={navbarStyle}>
      <div className="container">
          <NavLink exact to="/" className="nav-link" style={{ color: '#69140E', fontFamily: 'Sriracha, cursive' }}>
            HOME
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
              <NavLink exact to="/users" className="nav-link" style={{ color: '#69140E', fontFamily: 'Sriracha, cursive' }}>
                USERS
              </NavLink>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    exact
                    to={`/profile/${user.username}`}
                    className="nav-link"
                    style={{ color: '#69140E', fontFamily: 'Sriracha, cursive' }}
                  >
                    {user.username}'S PROFILE
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/"
                    className="nav-link"
                    onClick={handleLogout}
                    style={{ color: '#69140E', fontFamily: 'Sriracha, cursive' }}
                  >
                    LOGOUT
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink exact to="/login" className="nav-link" style={{ color: '#69140E', fontFamily: 'Sriracha, cursive' }}>
                    LOGIN
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/signup" className="nav-link" style={{ color: '#69140E', fontFamily: 'Sriracha, cursive' }}>
                    SIGN UP
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








