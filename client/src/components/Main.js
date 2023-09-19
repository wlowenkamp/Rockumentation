import React, { useState, useEffect } from 'react';
import AlbumCard from './AlbumCard';
import { UserContext } from './UserContext/User';

const Main = ({ user }) => {
  const [albums, setAlbums] = useState([]);
  const [collection, setCollection] = useState([]); // State to store the collection of albums

  // Function to add an album to the collection
  const addToCollection = (albumId) => {
    // Check if the album is already in the collection
    if (!collection.some((album) => album.id === albumId)) {
      // Find the album by ID from the albums list
      const albumToAdd = albums.find((album) => album.id === albumId);
      if (albumToAdd) {
        // Add the album to the collection
        setCollection([...collection, albumToAdd]);
      }
    }
  };

  useEffect(() => {
    fetch('/api/albums')
      .then((response) => response.json())
      .then((data) => setAlbums(data))
      .catch((error) => console.error('Error fetching albums:', error));
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mt-4">Rockumentation</h1>
      <h2 className="text-center mt-4"> Album Catalog</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {albums.map((album) => (
          <div className="col" key={album.id}>
            <AlbumCard album={album} user={user} addToCollection={addToCollection} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;




