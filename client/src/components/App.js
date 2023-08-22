import React from "react";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom"; 
import Main from "./Main";
import Users from "./Users";
import UserProfile from "./UserProfile";
import Login from "./Login";
import SignUp from "./SignUp";
import Navbar from "./Navbar";

const App = () => {

  const handleSearch = (searchQuery) => {
    
  }
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/profile/:id">
          <UserProfile />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

