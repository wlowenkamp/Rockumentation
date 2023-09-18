import React, { useState, useEffect } from 'react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    fetch(`/api/albums?q=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data))
      .catch((error) => {
        console.error('Error fetching search results:', error);
        setSearchResults([]);
      });
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for an album!"
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {searchResults.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>{result.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
