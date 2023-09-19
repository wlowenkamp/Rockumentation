import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from './UserContext/User';

function Login({ loginStatus, handleLogin, user, handleUser }) {
  const history = useHistory();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  // const [formData, setFormData] = useState({
  //   username: '',
  //   password: '',
  // });
  const [loginError, setLoginError] = useState(null);
  // const {user, setUser} = useContext(UserContext);

  const handleInputChange = async () => {
  

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username:username, password:password}),
    });

    if (response.ok) {
      // response.json().then(responseBody => {
      //   setUser(responseBody)
      //   history.push(`/profile/${data.user.username}`);
      // })

      const data = await response.json();
      if (response.status === 202) {
        setLoginError(null);
        handleLogin(data);

        const previous = history.location.state && history.location.state.from

        if (previous && (previous !== "/api/login" && previous !== "/api/signup")) {
          history.push(previous)
        }
        else {
          history.push("/profile/:id")
        }
        handleUser(data)

        // history.push(`/profile/${data.username}`);
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


  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'DELETE',
      });

      if (response.ok) {

        console.log('Logged out successfully');
      } else {
        console.error('Logout failed with status: ' + response.status);

      }
    } catch (error) {
      console.error('Error logging out: ', error);

    }
  };
}

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <div>
        <button type="submit" onClick={handleInputChange}>Login</button>
      </div>
      {loginError && <div>{loginError}</div>}
    </form>
  );
}

export default Login;
