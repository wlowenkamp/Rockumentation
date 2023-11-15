import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';


const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="container bg- #E1DDCB text-#69140E"> {/* Set the background and text color */}
      <h1 className="text-center mt-4" style={{ fontFamily: 'Permanent Marker, cursive' }}>
        Rockumentation
      </h1>
      <h2 className="text-center mt-4" style={{ fontFamily: 'Sriracha, cursive' }}> USERS</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {users.map((user) => (
          <div className="col" key={user.id}>
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;

