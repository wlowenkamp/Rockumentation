import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { useUser } from './UserContext/User';
import Main from './Main';
import UserProfile from './UserProfile';
import Login from './Login';
import SignUp from './SignUp';
import Navbar from './Navbar';
import Users from './Users'

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();
  const { user, setUser } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch user session data and update the user state
    fetch('/api/check_session')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('User not authenticated');
        }
      })
      .then((userData) => {
        setUser(userData);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error('Error checking session:', error);
        setUser(null);
        setIsLoggedIn(false);
      });
  }, [setUser]);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
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
        <Navbar
          handleSearch={handleSearch}
          loginStatus={isLoggedIn} 
          handleUser={setUser} 
          user={user}
        />
        <Switch>
          <Route exact path="/">
            <Main user={user} handleUser={setUser} /> 
          </Route>
          <Route path="/login">
            <Login handleLogin={handleLogin} user={user} handleUser={setUser} />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/profile/:username">
            {({ match }) => (
              <UserProfile isLoggedIn={isLoggedIn} user={user} handleUser={setUser} /> 
            )}
          </Route>
        </Switch>
    </Router>
  );
};

export default App;







