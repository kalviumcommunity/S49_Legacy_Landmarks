import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {

  const [placeName, setName] = useState('');
  const [location, setLocation] = useState('');
  const [yearBuilt, setyearBuilt] = useState('');
  const [architect, setArchitect] = useState('');
  const [architecturalStyle, setarchitecturalStyle] = useState('');
  const [historicalSignificance, sethistoricalSignificance] = useState('');
  const [currentUse, setcurrentUse] = useState('');
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/placeData`);
        const filteredData = response.data.filter(item => item._id === id);
        console.log(filteredData)
        if (filteredData) {
          setName(filteredData[0].placeName);
          setLocation(filteredData[0].location);
          setyearBuilt(filteredData[0].yearBuilt);
          setArchitect(filteredData[0].architect);
          setarchitecturalStyle(filteredData[0].architecturalStyle);
          sethistoricalSignificance(filteredData[0].historicalSignificance);
          setcurrentUse(filteredData[0].currentUse);
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
    const formData = { placeName, location, yearBuilt, architect, architecturalStyle, historicalSignificance, currentUse }
      axios.put(`http://localhost:3000/updateData/${id}`, formData)
        .then(result => {
          console.log(result);   
          navigate('/UserData');
        })
        .catch(error => console.error(error));
    }

  

  return (
    <div id="FormContainer">
      <div>
        <form id="Form" onSubmit={handleFormUpdate}>
          <h2>Suggest A New Place</h2>
          <div>
            <input type="text" value={placeName} onChange={(e) => setName(e.target.value)} required />
          </div>
          <br />
          <div>
            <input value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
          <br />
          <div>
            <input value={yearBuilt} onChange={(e) => setyearBuilt(e.target.value)} />
          </div>
          <br />
          <div>
            <input value={architect} onChange={(e) => setArchitect(e.target.value)} required />
          </div>
          <br />
          <div>
            <input value={architecturalStyle} onChange={(e) => setarchitecturalStyle(e.target.value)} required />
          </div>
          <br />
          <div>
            <input value={historicalSignificance} onChange={(e) => sethistoricalSignificance(e.target.value)} />
          </div>
          <br />
          <div>
            <input value={currentUse} onChange={(e) => setcurrentUse(e.target.value)} />
          </div>
          <br />
          <div>
            <button type="submit" className='btn-btn-success'>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
