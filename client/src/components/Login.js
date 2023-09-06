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
    console.log(formData.username, formData.password);

    try {
      const response = await fetch('http://127.0.0.1:5555/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          console.log(data);
          setLoginError(null);
          handleLogin(data);
          history.push(`/profile/${data.id}`);
        } else {
          console.log('Login failed');
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
