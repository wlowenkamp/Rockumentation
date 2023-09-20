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

  const handleSuccess = () => {
    toast.success('Account created successfully!', { autoClose: 2000 });
    history.push('/login');
  };

  const handleErrorResponse = (error) => {
    const errorMessage = error.message || 'Registration failed. Please check your input.';
    toast.error(errorMessage);
    setSignUpError(errorMessage);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ username, password, profile_picture }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 409) {
        throw new Error('Username already exists');
      }
      if (response.status === 400) {
        throw new Error('Password must contain letters and numbers');
      }
      if (!response.ok) {
        throw new Error('Registration failed. Please check your input.');
      }

      await response.json();
      handleSuccess();
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mt-4">Rockumentation</h1>
          <h2 className="text-center mt-4">Sign Up</h2>
          <ToastContainer />
          {signUpError && <p className="text-danger">{signUpError}</p>}
          <form onSubmit={handleSubmit} className="text-center">
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
            <button type="submit" className="btn btn-dark">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;









