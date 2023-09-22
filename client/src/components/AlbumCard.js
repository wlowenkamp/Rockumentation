import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from './UserContext/User';

function AlbumCard({ album, user,}) {
  const [showDetails, setShowDetails] = useState(false);
  console.log(user)

  


  const handleViewDetails = () => {
    setShowDetails(!showDetails);
  };

  const addToCollection = () => {
    try {
        const response = fetch(`/api/users/${user.username}/collection`, {
          method: 'PATCH',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(album)
      });

      if (!response.ok) {
        throw new Error('Failed to add album to collection');
      }


      notifySuccess('Album added to collection');
    } catch (error) {
      console.error('Error adding album to collection:', error);
    }
  };


  const removeFromCollection = async (albumId) => {
    try {
      const response = await fetch(`/api/users/${user.username}/collection/albums/${albumId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove album from collection');
      }

      notifySuccess('Album removed from collection');
    } catch (error) {
      console.error('Error removing album from collection:', error);
    }
  };

  return (
    <div className="card">
      <img src={album.image} className="card-img-top" alt={album.title} />
      <div className="card-body">
        <h5 className="card-title">{album.title}</h5>
        <p className="card-text">{album.artist}</p>
        <button className="btn btn-dark" onClick={handleViewDetails}>
          {showDetails ? "Hide Details" : "View Details"}
        </button>

        {showDetails && (
          <div>
            <p>Release Year: {album.release_year}</p>
            <p>Genre: {album.genre}</p>
          </div>
        )}

        {user?.collection?.includes(album.id) ? (
          <button className="btn btn-danger" onClick={removeFromCollection}>
            Remove from Collection
          </button>
        ) : user ? (
          <button className="btn btn-success" onClick={addToCollection}>
            Add to Collection
          </button>
        ) : (
          <p>Please log in to add or remove albums from your collection.</p>
        )}
      </div>
    </div>
  );
}

export default AlbumCard;










