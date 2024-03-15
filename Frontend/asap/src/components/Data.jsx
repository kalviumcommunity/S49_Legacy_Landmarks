import React from "react";
import data from "./dummyData.json";
import './Data.css'; 

function Data() {
  return (
    <div>
      {data && data.map((item) => {
        return (
          <div className="image-container" key={item.id}>
            <img src={item.imageURl} alt={item.placeName} />
            <h1>{item.placeName}</h1>
            <p>{item.location}</p>
            <p>{item.yearBuilt}</p>
            <p>{item.architect}</p>
            <p>{item.architecturalStyle}</p>
            <p>{item.historicalSignificance}</p>
            <p>{item.currentUse}</p>
            <br />
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default Data;
