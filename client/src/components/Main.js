import React, { useState, useEffect } from 'react';
import AlbumCard from './AlbumCard';
import { UserContext } from './UserContext/User';

const Main = () => {
  const [albums, setAlbums] = useState([]);
  // const [masterCollection, setMasterCollection]= useState([]);
  // const [albumInCollection, setAlbumInCollection]= useState ({});

  useEffect(() => {
    fetch('/api/albums')
      .then((response) => response.json())
      .then((data) => setAlbums(data))
      .catch((error) => console.error('Error fetching albums:', error));
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mt-4">Rockumentation</h1>
      <h2 className = "text-center mt-4"> Album Catalog</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {albums.map((album) => (
          <div className="col" key={album.id}>
            <AlbumCard album={album} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;


