import React, { useState, useEffect } from 'react';
import CollectionCard from './CollectionCard';

const UserProfile = ({ activeUser, isLoggedIn }) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeUser) {
      // Fetch collections only if activeUser exists
      fetch(`/api/users/${activeUser.id}/favorites`)
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
      setLoading(false); 
    }
  }, [activeUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center mt-4">Welcome, {activeUser?.username || "Guest"}!</h1>
      {activeUser && (
        <>
          <h2> Your Collection</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {Array.isArray(collections) && collections.length > 0 ? (
              collections.map((collection) => (
                <div className="col" key={collection.id}>
                  <CollectionCard collection={collection} />
                </div>
              ))
            ) : (
              <p>This collection is empty!</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;


