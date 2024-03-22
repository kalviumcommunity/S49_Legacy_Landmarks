import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Update = () => {
  const [placeName, setName] = useState('');
  const [location, setLocation] = useState('');
  const [yearBuilt, setYearBuilt] = useState('');
  const [architect, setArchitect] = useState('');
  const [architecturalStyle, setArchitecturalStyle] = useState('');
  const [historicalSignificance, setHistoricalSignificance] = useState('');
  const [currentUse, setCurrentUse] = useState('');

  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/placeData`);
        const filteredData = response.data.filter(item => item._id === id);
        console.log(filteredData)
        if (filteredData) {
          setName(filteredData[0].placeName);
          setLocation(filteredData[0].location);
          setYearBuilt(filteredData[0].yearBuilt);
          setArchitect(filteredData[0].architect);
          setArchitecturalStyle(filteredData[0].architecturalStyle);
          setHistoricalSignificance(filteredData[0].historicalSignificance);
          setCurrentUse(filteredData[0].currentUse);
        } else {
          console.log("Data not found");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  const handleFormUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/updateData/${id}`, { 
        placeName,  
        location,
        yearBuilt,
        architect,
        architecturalStyle,
        historicalSignificance,
        currentUse
      })
      .then((result) => {
        console.log(result);
        navigate('/UserData');
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
