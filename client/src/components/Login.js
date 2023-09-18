import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login({ loginStatus, handleLogin }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loginError, setLoginError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setLoginError(null);
          handleLogin(data.user);
          // Redirect to the user's profile page based on their username
          history.push(`/profile/${data.user.username}`);
        } else {
          console.log('Login failed');
          console.log('Response status:', response.status);
          setLoginError('Invalid username or password');
        }
      } else {
        console.log('HTTP request failed with status: ' + response.status);
        setLoginError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in: ', error);
      setLoginError('An error occurred while logging in');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'DELETE',
      });

      if (response.ok) {
        // Handle successful logout here (e.g., clear user data from state)
        // You can also redirect the user to a different page or perform any other actions
        // after successful logout.
        console.log('Logged out successfully');
      } else {
        console.error('Logout failed with status: ' + response.status);
        // Handle logout failure (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error logging out: ', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
      {loginError && <div>{loginError}</div>}
    </form>
  );
}

export default Login;
