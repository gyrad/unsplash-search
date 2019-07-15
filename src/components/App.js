import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import TinyGallery from 'tinygallery/dist/tinygallery.min.js';

function App() {
  const [images, setImages] = useState([]);
  const defaultSearch = 'Tibet';

  useEffect(() => {
    const resultsGallery = new TinyGallery('results-gallery');
    resultsGallery.init();
    console.log('tinygallery initialized...');
  });

  useEffect(() => {
    handleSearch(defaultSearch);
  }, []);

  // Search
  const handleSearch = async searchTerm => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos/?query=${searchTerm}&per_page=40`,
        {
          headers: {
            Authorization:
              'Client-ID 3fe5285f38195ff9e15b9d1eaeb2a4e544b47be9837aac84799d9cb8551c6edb'
          }
        }
      );
      const results = await response.json();
      setImages(results.results);
      // console.log(results.results);

      document.getElementById('litebox-results-gallery').remove();
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  const renderImageResults = images.map(image => (
    <a href={image.urls.regular} key={image.id}>
      <img
        src={image.urls.thumb}
        alt={image.alt_description}
        data-caption={image.description}
      />
    </a>
  ));

  return (
    <div className="container">
      <div className="pb-4 mt-4">
        <h1 className="display-3">Unsplash Search</h1>
        <Searchbar onSubmit={handleSearch} defaultValue={defaultSearch} />
      </div>
      <div className="tinygallery" id="results-gallery">
        {renderImageResults}
      </div>
    </div>
  );
}

export default App;
