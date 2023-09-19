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
    <div className="container">
      <h1 className="text-center mt-4">Rockumentation</h1>
      <h2 className = "text-center mt-4"> Users</h2>
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
