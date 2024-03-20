import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Update = () => {
  const [placeName, setName] = useState('');
  const [location, setLocation] = useState('');
  const [yearBuilt, setYearBuilt] = useState('');
  const [architect, setArchitect] = useState('');
  const [architecturalStyle, setArchitecturalStyle] = useState('');
  const [historicalSignificance, setHistoricalSignificance] = useState('');
  const [currentUse, setCurrentUse] = useState('');

  const navigate = useNavigate();
  const handleFormUpdate = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/updateData/:id', {
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
    <div id="UpdateFormContainer">
      <div>
        <form id="UpdateForm" onSubmit={handleFormUpdate}>
          <h2>Update Place Details</h2>
          <div>
            <input type="text" placeholder="Update placename..." value={placeName} onChange={(e) => setName(e.target.value)} required />
          </div>
          <br />
          <div>
            <input placeholder="Update location..." value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
          <br />
          <div>
            <input placeholder="Update yearbuilt..." value={yearBuilt} onChange={(e) => setYearBuilt(e.target.value)} />
          </div>
          <br />
          <div>
            <input type="text" placeholder="Update architect..." value={architect} onChange={(e) => setArchitect(e.target.value)} required />
          </div>
          <br />
          <div>
            <input placeholder="Update archtecturalStyle..." value={architecturalStyle} onChange={(e) => setArchitecturalStyle(e.target.value)} required />
          </div>
          <br />
          <div>
            <input placeholder="Update historicalSignificance..." value={historicalSignificance} onChange={(e) => setHistoricalSignificance(e.target.value)} />
          </div>
          <br />
          <div>
            <input placeholder="Update cureentUse..." value={currentUse} onChange={(e) => setCurrentUse(e.target.value)} />
          </div>
          <br />
          <div>
            <button type="submit" className="update-btn">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
