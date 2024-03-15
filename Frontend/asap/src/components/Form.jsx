import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = () => {

  const [placeName, setName] = useState('');
  const [location, setLocation] = useState('');
  const [yearBuilt, setyearBuilt] = useState('');
  const [architect, setArchitect] = useState('');
  const [architecturalStyle, setarchitecturalStyle] = useState('');
  const [historicalSignificance, sethistoricalSignificance] = useState('');
  const [currentUse, setcurrentUse] = useState('');
  
  const navigate = useNavigate();

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
        currentUse,

      })
      .then((result) => {
        console.log(result);
        
      })
      .catch((error) => console.error(error));
  };

  return (
    <div id="FormContainer" >
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
            <input placeholder="yearbuilt..." value={yearBuilt} onChange={(e) => setyearBuilt(e.target.value)} />
          </div>
          <br />
          <div>
            <input type="text" placeholder="architect..." value={architect} onChange={(e) => setArchitect(e.target.value)} required />
          </div>
          <br />
          <div>
            <input  placeholder="archtecturalStyle..." value={architecturalStyle} onChange={(e) => setarchitecturalStyle(e.target.value)} required />
          </div>
          <br />
          <div>
            <input  placeholder="historicalSignificance..." value={historicalSignificance} onChange={(e) => sethistoricalSignificance(e.target.value)} />
          </div>
          <br />
          <div>
            <input  placeholder="cureentUse..." value={currentUse} onChange={(e) => setcurrentUse(e.target.value)} />
          </div>
          <br />
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
