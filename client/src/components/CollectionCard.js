import React from 'react';

function CollectionCard({ collectionName, userName, albums }) {
  console.log(albums)
  return (
    <div className="collection-card">
      <h2>{collectionName}</h2>
      <p>Created by: {userName}</p>
      <div className="album-list">
        {albums?.map((album) => (
          <div className="album" key={album.id}>
            <img src={album.image} alt={album.title} />
            <h3>{album.title}</h3>
            <p>Artist: {album.artist}</p>
            <p>Genre: {album.genre}</p>
            <p>Year: {album.release_year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default CollectionCard;

