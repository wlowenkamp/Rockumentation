import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext/User';

function AlbumCard({ album, handleAddToCollection, handleRemoveFromCollection }) {
  const { activeUser } = useContext(UserContext);

  const [showDetails, setShowDetails] = useState(false);
  const [inCollection, setInCollection] = useState(false);

  const handleViewDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="card">
      <img src={album.image} className="card-img-top" alt={album.title} />
      <div className="card-body">
        <h5 className="card-title">{album.title}</h5>
        <p className="card-text">{album.artist}</p>
        <button className="btn btn-primary" onClick={handleViewDetails}>
          {showDetails ? "Hide Details" : "View Details"}
        </button>

        {showDetails && (
          <div>
            <p>Release Year: {album.release_year}</p>
            <p>Genre: {album.genre}</p>
          </div>
        )}

        {activeUser ? 
          <div>
            {inCollection ? (
              <button className="btn btn-primary" onClick={() => handleRemoveFromCollection(album.id)}>
                Remove from Collection
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => handleAddToCollection(album.id)}>
                Add to Collection
              </button>
            )}
          </div>
         :  
          <p>Please log in to add or remove albums from your collection.</p>
        }
      </div>
    </div>
  );
}

export default AlbumCard;






