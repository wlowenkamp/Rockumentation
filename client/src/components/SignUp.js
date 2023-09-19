import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profile_picture, setProfile_Picture] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const newUserData = { username: username, password: password, profile_picture: profile_picture };

  function handleSubmit(event) {
    event.preventDefault();

    fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(newUserData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Registration failed. Please check your input.'); // Throw an error message instead
        }
        return response.json();
      })
      .then(() => {
        toast.success('Account created successfully!', { autoClose: 2000 });

        history.push('/login');
      })
      .catch((error) => {
        setSignUpError(error.message || 'Registration failed. Please check your input.');
      });
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <ToastContainer />
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
              <label htmlFor="profile_picture" className="form-label">
                Profile Picture URL:
              </label>
              <input
                type="text"
                className="form-control"
                id="profile_picture"
                name="profile_picture"
                onChange={(e) => setProfile_Picture(e.target.value)}
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






