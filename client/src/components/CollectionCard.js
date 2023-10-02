import React from 'react';

function CollectionCard({ album, isSelected, onSelect }) {
  return (
    <div className={`card flip-card ${isSelected ? 'selected' : ''}`} onClick={onSelect}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={album.image} alt={album.title} className="card-img-top" />
        </div>
        <div className="flip-card-back">
          <h3 className="card-title">{album.title}</h3>
          <p className="card-text">Artist: {album.artist}</p>
          <p className="card-text">Genre: {album.genre}</p>
          <p className="card-text">Year: {album.release_year}</p>
        </div>
      </div>
    </div>
  );
}

export default CollectionCard;






