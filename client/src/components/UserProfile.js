import React, { useEffect, useState, useContext } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import {UserContext} from './UserContext/User';
import CollectionCard from './CollectionCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
  const { username } = useParams();
  const { user, setUser } = useContext(UserContext);

  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProfilePicture, setNewProfilePicture] = useState('');
  const [isChangingPicture, setIsChangingPicture] = useState(false);

  const handleProfilePictureChange = () => {
    setIsChangingPicture(!isChangingPicture);
  };

  const notifySuccess = () => {
    toast.success('Profile picture uploaded successfully!');
  };

  const fetchCollections = () => {
    if (username && user) {
      fetch(`/api/users/${username}/collection`)
        .then((response) => response.json())
        .then((collectionsData) => {
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
  };

  const handleSubmitProfilePicture = async () => { 
    console.log('handleSubmitProfilePicture called');
    try {
      setIsChangingPicture(true);
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
  
    
      const userDataResponse = await fetch(`/api/profile/${user.username}`); 
      const data = await userDataResponse.json(); 
      setUser({ ...user, profile_picture: data.profile_picture });
      notifySuccess();
    } catch (error) {
      console.error('Error updating profile picture:', error);
      setIsChangingPicture(false);
    }
  };
  

  useEffect(() => {
    fetchCollections();
    setIsChangingPicture(false);
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
                src={user.profile_picture || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'}
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
                  onClick={handleSubmitProfilePicture}
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
                disabled={isChangingPicture}
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
                    collectionName={collection.name}
                    userName={user.username}
                    albums={collection.albums}
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













