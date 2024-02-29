import React from 'react';
import Data from './components/Data';
import axios from 'axios'
import { useEffect, useState } from 'react';

const HistoricalPlaces = () => {
  let [data, setData] = useState()

  useEffect(()=>{
    axios.get('http://localhost:3000/placeData').then(res => setData(res.data)).catch(err => console.error(err))
  })
  return (
    <div className="container">
      <header>
        <h1>Explore Historical Places</h1>
      </header>
      <main>
        <p>Welcome to our historical places exploration platform. Discover and learn about the fascinating historical landmarks around the world.</p>
      </main>
      {/* <Data/> */}
      <div>{data && data.map((item)=>{
            return(
                <div key={item.id}>
                    <h1>{item.placeName}</h1>
                    <p>{item.location}</p>
                    <p>{item.yearBuilt}</p>
                    <p>{item.architect}</p>
                    <p>{item.architecturalStyle}</p>
                    <p>{item.historicalSignificance}</p>
                    <p>{item.currentUse}</p>
                </div>
            )
        })}</div>
    </div>
  );
};

export default HistoricalPlaces;
