import React, { useState, useEffect } from 'react';
import CollectionCard from './CollectionCard';

const Collections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5555/api/collections')
      .then((response) => response.json())
      .then((data) => setCollections(data))
      .catch((error) => console.error('Error fetching collections:', error));
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mt-4">Collections</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {collections.map((collection) => (
          <div className="col" key={collection.id}>
            <CollectionCard collection={collection} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
