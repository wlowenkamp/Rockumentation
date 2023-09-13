import React, { useState, useEffect } from 'react';
import CollectionCard from './CollectionCard';

const UserProfile = ({ activeUser }) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeUser) {
      // Fetch collections only if activeUser exists
      fetch(`http://127.0.0.1:5555/api/users/${activeUser.id}/favorites`)
        .then((response) => response.json())
        .then((data) => {
          setCollections(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching collections:", error);
          setLoading(false);
        });
    } else {
      setLoading(false); // Handle the case where activeUser is undefined
    }
  }, [activeUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!activeUser) {
    return <div>User not found.</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center mt-4">Welcome, {activeUser?.username}!</h1>
      <h2>{activeUser?.username}'s Collection</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {Array.isArray(collections) && collections.length > 0 ? (
          collections.map((collection) => (
            <div className="col" key={collection.id}>
              <CollectionCard collection={collection} />
            </div>
          ))
        ) : (
          <p>Loading collections...</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

