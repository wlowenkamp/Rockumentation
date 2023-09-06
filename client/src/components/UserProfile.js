import React, { useState, useEffect } from 'react';
import CollectionCard from './CollectionCard';

const UserProfile = ({ activeUser }) => {
  console.log(activeUser)
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    if (activeUser) {
      fetch(`http://127.0.0.1:5555/api/users/${activeUser.id}/collections`)
        .then((response) => response.json())
        .then((data) => setCollections(data))
        .catch((error) => console.error('Error fetching collections:', error));
    }
  }, [activeUser]);

  return (
         <div className="container">
            <h1 className="text-center mt-4">Welcome, {activeUser?.username}!</h1>
            <h2>Your Collections</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {collections.map((collection) => (
          <div className="col" key={collection.id}>
            <CollectionCard collection={collection} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
