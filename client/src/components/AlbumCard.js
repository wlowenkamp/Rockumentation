import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from './UserContext/User';

function AlbumCard({ album, user }) {
  const [showDetails, setShowDetails] = useState(false);

  const { setUser } = useContext(UserContext);

  const addAlbumToUser = (new_album) => {
    const new_user = {
      ...user,
      collection: {
        ...user.collection,
        albums: [...user.collection.albums, new_album],
      },
    };
    setUser(new_user);
  };

  const handleViewDetails = () => {
    setShowDetails(!showDetails);
  };

  const addToCollection = async () => {
    const data = {
      album_id: album.id,
      collection_id: user.collection.id,
    };
    console.log(data);
    console.log(user);
    try {
      const response = await fetch(`/api/addingnewalbum`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to add album to collection');
      } else {
        const albumObject = await response.json();
        console.log(albumObject);
        addAlbumToUser(albumObject);
      }
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
        throw Error('Failed to remove album from collection');
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
        <h5 className="card-title card-text">{album.title}</h5>
        <p className="card-text card-text card-artist">{album.artist}</p>
        <button className="btn btn-dark card-button" onClick={handleViewDetails}>
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>

        {showDetails && (
          <div>
            <p className="card-text card-detail">Release Year: {album.release_year}</p>
            <p className="card-text card-detail">Genre: {album.genre}</p>
          </div>
        )}

        {user?.collection.albums.map((a) => a.id).includes(album.id) ? (
          <button className="btn btn-danger card-button" onClick={removeFromCollection}>
            Remove from Collection
          </button>
        ) : user ? (
          <button className="btn btn-success card-button" onClick={addToCollection}>
            Add to Collection
          </button>
        ) : (
          <p className="card-label">Please log in to add or remove albums from your collection.</p>
        )}
      </div>
    </div>
  );
}

export default AlbumCard;










