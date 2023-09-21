import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import { UserContext, UserProvider } from "./UserContext/User";
import Main from "./Main";
import Users from "./Users";
import UserProfile from "./UserProfile";
import Login from "./Login";
import SignUp from "./SignUp";
import Navbar from "./Navbar";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();
  const [user, setUser] = useState(null);
  const handleUser = (user) => setUser(user)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  useEffect(() => {
    fetch("/api/check_session")
      .then((response) => {
        if (response.ok) {
          response.json().then((user) => setUser(user));
        }
      });
  }, [setUser]);

  const handleLogin = (user) => {
    setIsLoggedIn(true)
    setUser(user)
    console.log(user)
  };



  const handleSearch = (searchQuery) => {
    fetch(`/api/albums?q=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data))
      .catch((error) => {
        console.error('Error fetching search results:', error);
        setSearchResults([]);
      });
  };

  return (
    <Router>
      <UserProvider>
      <Navbar
        handleSearch={handleSearch}
        loginStatus={!!user}
        handleUser={handleUser}  
        user={user} 
      />
      <Switch>
        <Route exact path="/">
          <Main user={user} />
        </Route>
        <Route path="/login">
          <Login handleLogin={handleLogin} user={user} handleUser={handleUser} />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/profile/:id">
          <UserProfile user={user} isLoggedIn={isLoggedIn} />
        </Route>
      </Switch>
      </UserProvider>
    </Router>

  );
};

export default App;






