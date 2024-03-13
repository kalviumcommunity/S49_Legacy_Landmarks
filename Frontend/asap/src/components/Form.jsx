import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [userName, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [placeName, setName] = useState('');
  const [location, setLocation] = useState('');
  const [yearBuilt, setyearBuilt] = useState('');
  const [architect, setarchitect] = useState('');
  const [architecturalStyle, setarchitecturalStyle] = useState('');
  const [historicalSignificance, sethistoricalSignificance] = useState('');
  const [currentUse, setcurrentUse] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/addData', {
        userName,
        email,
        password,
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
    <div id="FormContainer">
      <div>
        <form id="Form" onSubmit={handleFormSubmit}>
          <h2>Give your Details</h2>
          <div>
            <input type="text" placeholder="username..." value={userName} onChange={(e) => setuserName(e.target.value)} required />
          </div>
          <br />
          <div>
            <input type='email' placeholder="email..." value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <br />
          <div>
            <input type='password' placeholder="password..." value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <br />
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
            <input placeholder="architect..." value={architect} onChange={(e) => setarchitect(e.target.value)} />
          </div>
          <br />
          <div>
            <input placeholder="architecturalStyle..." type="text" value={architecturalStyle} onChange={(e) => setarchitecturalStyle(e.target.value)} required />
          </div>
          <br />
          <div>
            <input placeholder="historicalSignificance..." type="text" value={historicalSignificance} onChange={(e) => sethistoricalSignificance(e.target.value)} required />
          </div>
          <br />
          <div>
            <input placeholder="currentUse..." type="text" value={currentUse} onChange={(e) => setcurrentUse(e.target.value)} required />
          </div>
          <br />
          <div>
            <button type="submit">Add Entity</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
