import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function UserData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://legacy-landmarks.onrender.com/placeData');
      setData(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this entity?');
      if (confirmDelete) {
        await axios.delete(`https://legacy-landmarks.onrender.com/placeData/${id}`);
        setData(data.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Link to="/" className="home-btn">Home</Link>
      {data.map((item) => (
        <div key={item._id}>
          <h1>{item.placeName}</h1>
          <p>{item.location}</p>
          <p>{item.yearBuilt}</p>
          <p>{item.architect}</p>
          <p>{item.architecturalStyle}</p>
          <p>{item.historicalSignificance}</p>
          <p>{item.currentUse}</p>
          <Link to={`/update/${item._id}`}><button>Edit</button></Link>
          <button onClick={() => handleDelete(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
