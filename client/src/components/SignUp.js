import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SignUp() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const newUserData = {
      username,
      password,
      profile_picture: profilePic,
    };

    fetch('http://127.0.0.1:5555/api/register', {
      method: 'POST',
      body: JSON.stringify(newUserData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result.message === 'Registration successful') {
          // Set registration success to true
          setRegistrationSuccess(true);

          // Redirect to the login page after a delay (optional)
          setTimeout(() => {
            history.push('/login');
          }, 2000); // Redirect after 2 seconds (adjust as needed)
        } else {
          // Handle registration errors
          setSignUpError('Registration failed. Please check your input.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setSignUpError('An error occurred during registration.');
      });
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Sign Up</h2>
          {signUpError && <p className="text-danger">{signUpError}</p>}
          {registrationSuccess && (
            <div className="alert alert-success" role="alert">
              Account created successfully!
            </div>
          )}
          <form onSubmit={handleSubmit}>
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
            <div className="mb-3">
              <label htmlFor="profilePic" className="form-label">
                Profile Picture URL:
              </label>
              <input
                type="text"
                className="form-control"
                id="profilePic"
                value={profilePic}
                onChange={(e) => setProfilePic(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;



