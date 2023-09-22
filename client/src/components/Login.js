import React, { useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './UserContext/User';

function Login() {
  const {user, setUser} = useContext(UserContext);
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async () => {
    try {
      // Perform login logic
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (response.status === 202) {
          setLoginError(null);

          setUser(data);

          const previous = history.location.state && history.location.state.from;

          if (previous && (previous !== "/api/login" && previous !== "/api/signup")) {
            history.push(previous);
          } else {
            history.push(`/profile/${data.username}`);
          }

          // Display success toast
          toast.success('Login successful!', { autoClose: 2000 });
        } else {
          setLoginError('Invalid username or password');
        }
      } else {
        setLoginError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in: ', error);
      setLoginError('An error occurred while logging in');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mt-4">Rockumentation</h1>
          <h2 className="text-center mt-4">Login</h2>
          <ToastContainer />
          <form onSubmit={(event) => event.preventDefault()} className="text-center">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username:
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-dark" onClick={handleLogin}>
              Login
            </button>
          </form>
          {loginError && <div className="text-danger">{loginError}</div>}
        </div>
      </div>
    </div>
  );
}

export default Login;



