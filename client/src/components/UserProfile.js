import React, { useEffect, useState, useContext } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { UserContext } from './UserContext/User';
import CollectionCard from './CollectionCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserProfile.css';

const UserProfile = () => {
  const { username } = useParams();
  const { user, setUser } = useContext(UserContext);

  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProfilePicture, setNewProfilePicture] = useState('');
  const [isChangingPicture, setIsChangingPicture] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const handleProfilePictureChange = () => {
    setIsChangingPicture(!isChangingPicture);
  };

  const notifySuccess = () => {
    toast.success('Profile picture uploaded successfully!');
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
        console.error("WHAT WAS THE STATUS FROM THE PATCH")
        console.log(response.status)
        throw new Error('Failed to update profile picture');
      }

      setIsChangingPicture(false);
      setNewProfilePicture('');

      const userDataResponse = await fetch(`/api/profile/${user.username}`);
      const data = await userDataResponse.text();
      console.log(data)
      setUser({ ...user, profile_picture: data.profile_picture });
      notifySuccess();
    } catch (error) {
      console.error('Error updating profile picture:', error);
      setIsChangingPicture(false);
    }
  };

    useEffect(() => {
    setIsChangingPicture(false);
}, [username, user]);

  if (!user && !username) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container-fluid">
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
          <div>
            <h2 className="text-center">Your Collection</h2>
            <p className="text-center">Created by: {user.username}</p>
          </div>
          <div className="gallery-container">
            {user.collection.albums.map((album) => (
              <div className="card gallery-item" key={album.id}>
                  <CollectionCard
                    album={album}
                    isSelected={selectedAlbum}
                    onSelect={() => setSelectedAlbum(album)}
                  />
                </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;















