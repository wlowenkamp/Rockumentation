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
  const {user, setUser} = useContext(UserContext);


  useEffect(() => {
    fetch("/api/check_session")
      .then((response) => {
        if (response.ok) {
          response.json().then((user) => setUser(user));
        }
      });
  }, [setUser]);

  const handleLogin = (activeUser) => {
    setUser(activeUser);
  };

  const handleLogout = () => {
    setUser(null); 
    history.push("/login")
  };

  const handleSearch = (searchQuery) => {
    fetch(`http://127.0.0.1:5555/api/albums?q=${searchQuery}`)
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
        handleLogout={handleLogout} 
        activeUser={user} 
      />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/login">
          <Login handleLogin={handleLogin} />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/profile/:id">
          <UserProfile activeUser={user} />
        </Route>
      </Switch>
      </UserProvider>
    </Router>

  );
};

export default App;



