import React, { useState, useEffect } from 'react';
import CollectionCard from './CollectionCard';
import { useParams } from 'react-router-dom';

const UserProfile = ({ user, isLoggedIn,}) => {
  
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProfilePicture, setNewProfilePicture] = useState('');
  const [isChangingPicture, setIsChangingPicture] = useState(false);


  const handleProfilePictureChange = () => {
    setIsChangingPicture(true); 
  };

  const handleSubmitProfilePicture = async () => {
    try {
      const response = await fetch(`/api/profile/${user.id}/profile_picture`, {
        method: 'PATCH',
        body: JSON.stringify({ profile_picture: newProfilePicture }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update profile picture');
      }


      setIsChangingPicture(false);
      setNewProfilePicture();


      fetch(`/api/profile/${user.id}`)
        .then((response) => response.json())
        .then((data) => {

          console.log('Updated Profile Data:', data);

          user.profile_picture = data.profile_picture;
        })
        .catch((error) => {
          console.error('Error fetching updated profile:', error);
        });
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

  useEffect(() => {
    if (user) {

      fetch(`/api/users/${user.id}/collection`)
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
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center mt-4">Welcome, {user?.username || "Guest"}!</h1>
      {user && (
        <>
          <div className="text-center">
          <img
            src={user.profile_picture}
            alt="Profile"
            className="img-thumbnail"
          />

            <br />
            {isChangingPicture ? (
              <>
                <input
                  type="text"
                  placeholder="Enter Profile Picture URL"
                  value={newProfilePicture}
                  onChange={(e) => setNewProfilePicture(e.target.value)}
                />
                <button
                  className="btn btn-primary mt-2"
                  onClick={handleSubmitProfilePicture}
                >
                  Save Profile Picture
                </button>
              </>
            ) : (
              <button className="btn btn-primary mt-2" onClick={handleProfilePictureChange}>
                Change Profile Picture
              </button>
            )}
          </div>
          <h2>Your Collection</h2>
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




