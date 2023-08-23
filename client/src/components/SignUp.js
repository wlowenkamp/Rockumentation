import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom"

function SignUp() {
  
  const history = useHistory();
  const [handleUsername, setUsername] = useState("")
  const [handlePassword, setPassword] = useState("")
  const [handleProfilePic, setProfilePic] = useState("")
  const [signUpError, setSignUpError] = useState("")

  function handleUsernameChange(event) {
    setUsername(event.target.value)
  };

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }

  function handleProfPicChange(event) {
    setProfilePic(event.target.value)
  };

  function handleSubmit(event) {
    event.preventDefault();
    const newUserData = {
      username: handleUsername,
      password: handlePassword,
      profile_picture: handleProfilePic,
    }

      fetch("http://127.0.0.1:5555/users", {
        method: "POST",
        body: JSON.stringify(newUserData),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((r) => r.json())
        .then((result) => {
          console.log(result)
          if (result.errors) {
            setSignUpError(result.errors.join(", "));
          } else {
            history.push("/login")
          }
          }
        )
        .catch((err) => console.log("Error: something went wrong(front end)", err))
  }

  return (
    <div className='sign-up-parent-container'>
    <div className="sign-up-container">
      {signUpError ? (
        <h2 className="sign-up-error">{signUpError}</h2>
      ) : null}
      <h1 className="sign-up-header">Call the shots with your own movie lists when you join us!</h1>
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username*" onChange={handleUsernameChange}/>
        <input type="password" placeholder="Password*" onChange={handlePasswordChange}/>
        <input type="text" placeholder="Paste an image link for a profile picture..." onChange={handleProfPicChange}/>
        <button className="sign-up-button" type="submit">Submit</button>
      </form>
    </div>
  </div>
  );
}

export default SignUp;