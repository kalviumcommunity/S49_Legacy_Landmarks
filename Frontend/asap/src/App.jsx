import React from 'react';
import Data from './components/Data';

const HistoricalPlaces = () => {
  return (
    <div className="container">
      <header>
        <h1>Explore Historical Places</h1>
      </header>
      <main>
        <p>Welcome to our historical places exploration platform. Discover and learn about the fascinating historical landmarks around the world.</p>
      </main>
      <Data/>
    </div>
  );
};

export default HistoricalPlaces;
