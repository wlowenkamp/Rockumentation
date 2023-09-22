import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useUser } from './UserContext/User';
import CollectionCard from './CollectionCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
  const { username } = useParams();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProfilePicture, setNewProfilePicture] = useState('');
  const [isChangingPicture, setIsChangingPicture] = useState(false);
  const { user, setUser } = useUser(); // Get setUser function from useUser

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
      setNewProfilePicture('');

      // Reload the user data to display the updated profile picture
      fetch(`/api/profile/${user.username}`)
        .then((response) => response.json())
        .then((data) => {
          setUser({ ...user, profile_picture: data.profile_picture });
          notifySuccess(); // Notify the user about the successful update
        })
        .catch((error) => {
          console.error('Error fetching updated profile:', error);
        });
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

  const notifySuccess = () => {
    toast.success('Profile picture uploaded successfully!');
  };

  useEffect(() => {
    if (username) {
      // Fetch the collections of the profile user
      fetch(`/api/users/${username}/collection`)
        .then((response) => response.json())
        .then((collectionsData) => {
          console.log('Collections Data:', collectionsData);
          setCollections(collectionsData);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching collections:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [username, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user && !username) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <h1 className="text-center mt-4">Welcome, {user ? user.username : 'Guest'}!</h1>
      {user && (
        <>
          <div className="text-center">
            <div className="profile-picture-container">
              <img
                src={user.profile_picture || 'default-profile-picture-url'} // Replace with the default profile picture URL
                alt="Profile"
                className="img-thumbnail"
              />
            </div>
            {isChangingPicture ? (
              <>
                <input
                  type="text"
                  placeholder="Enter Profile Picture URL"
                  value={newProfilePicture}
                  onChange={(e) => setNewProfilePicture(e.target.value)}
                />
                <button
                  className="btn btn-success mt-2"
                  onClick={() => {
                    handleSubmitProfilePicture();
                  }}
                  style={{ width: 100, height: 37 }}
                >
                  Save
                </button>
              </>
            ) : (
              <button
                className="btn btn-danger mt-2"
                onClick={handleProfilePictureChange}
                style={{ width: 300 }}
              >
                Change Profile Picture
              </button>
            )}
          </div>
          <h2>Your Collection</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {Array.isArray(collections) && collections.length > 0 ? (
              collections.map((collection) => (
                <div className="col" key={collection.id}>
                  <CollectionCard
                    collectionName={userData.collection.name}
                    userName={userData.username}
                    albums={userData.collection.albums}
                  />
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










