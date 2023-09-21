import React, { useState, useEffect } from 'react';
import CollectionCard from './CollectionCard';

const UserProfile = ({ activeUser, isLoggedIn,}) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProfilePicture, setNewProfilePicture] = useState('');
  const [isChangingPicture, setIsChangingPicture] = useState(false);


  const handleProfilePictureChange = () => {
    setIsChangingPicture(true); 
  };

  const handleSubmitProfilePicture = async () => {
    try {
      const response = await fetch(`/api/profile/${activeUser.id}/profile_picture`, {
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
      setNewProfilePicture('');


      fetch(`/api/profile/${activeUser.id}`)
        .then((response) => response.json())
        .then((data) => {

          console.log('Updated Profile Data:', data);

          activeUser.profile_picture = data.profile_picture;
        })
        .catch((error) => {
          console.error('Error fetching updated profile:', error);
        });
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

  useEffect(() => {
    if (activeUser) {

      fetch(`/api/users/${activeUser.id}/collection`)
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
          <div className="text-center">
            <img
              src={activeUser?.profile_picture || "https://cdn.vectorstock.com/i/preview-1x/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg"} 
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




