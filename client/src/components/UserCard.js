import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="user-card card">
      <img src={user.profile_picture} alt={user.username} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{user.username}</h5>
      </div>
    </div>
  );
};

export default UserCard;
