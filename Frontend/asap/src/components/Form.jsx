import React, { useState } from 'react';
import axios from 'axios'

const Form = () => {

  const [placeName, setName] = useState('');
  const [location, setLocation] = useState('');
  const [yearBuilt, setYearBuilt] = useState('');
  const [architect, setArchitect] = useState('');
  const [architecturalStyle, setArchitecturalStyle] = useState('');
  const [historicalSignificance, setHistoricalSignificance] = useState('');
  const [currentUse, setCurrentUse] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/addData', {

        placeName,
        location,
        yearBuilt,
        architect,
        architecturalStyle,
        historicalSignificance,
        currentUse
      })
      .then((result) => {
        console.log(result)
      })
      .catch((error) => console.error(error));
  };

  return (
    <div id="FormContainer">
      <div>
        <form id="Form" onSubmit={handleFormSubmit}>
          <h2>Suggest A New Place</h2> 

          <div>
            <input type="text" placeholder="placename..." value={placeName} onChange={(e) => setName(e.target.value)} required />
          </div>
          <br />
          <div>
            <input placeholder="location..." value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
          <br />
          <div>
            <input placeholder="yearbuilt..." value={yearBuilt} onChange={(e) => setYearBuilt(e.target.value)} />
          </div>
          <br />
          <div>
            <input type="text" placeholder="architect..." value={architect} onChange={(e) => setArchitect(e.target.value)} required />
          </div>
          <br />
          <div>
            <input placeholder="archtecturalStyle..." value={architecturalStyle} onChange={(e) => setArchitecturalStyle(e.target.value)} required />
          </div>
          <br />
          <div>
            <input placeholder="historicalSignificance..." value={historicalSignificance} onChange={(e) => setHistoricalSignificance(e.target.value)} />
          </div>
          <br />
          <div>
            <input placeholder="currentUse..." value={currentUse} onChange={(e) => setCurrentUse(e.target.value)} />
          </div>
          <br />
          <div>
            <button type="submit" className="submit-btn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
