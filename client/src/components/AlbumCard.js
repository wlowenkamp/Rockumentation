import React from 'react';

const AlbumCard = ({ album }) => {
  return (
    <div className="album-card card">
      <img src={album.image} alt={album.title} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{album.title}</h5>
        <p className="card-text">{album.artist}</p>
      </div>
    </div>
  );
};

export default AlbumCard;

