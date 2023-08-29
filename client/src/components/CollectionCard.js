import React from 'react';

const CollectionCard = ({ collection }) => {
  return (
    <div className="collection-card card">
      <div className="card-body">
        <h5 className="card-title">{collection.title}</h5>
        <p className="card-text">Albums:</p>
        <ul>
          {collection.albums.map((album) => (
            <li key={album.id}>{album.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CollectionCard;
