import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Main";
import Users from "./Users";
import UserProfile from "./UserProfile";
import Login from "./Login";
import SignUp from "./SignUp";
import Navbar from "./Navbar";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  
  const [user, setUser] = useState(null);

  const handleLogin = (activeUser) => {
    setUser(activeUser)
  }

  const handleSearch = (searchQuery) => {
    fetch(`http://127.0.0.1:5555/api/albums?q=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data))
      .catch((error) => {
        console.error('Error fetching search results:', error);
        setSearchResults([]);
      });
  };
console.log("will this work")
  return (
    <Router>
      <Navbar handleSearch={handleSearch} /> 
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
    </Router>
  );
};

export default App;


