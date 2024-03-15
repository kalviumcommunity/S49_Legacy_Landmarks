import React from 'react';
import Data from './Data';
import { Link } from 'react-router-dom';
import './HistoricPlaces.css';

export default function HistoricPlaces() {

  return (

    <div className="container">
      <div className="headline-container">
        <header>
          <h1>Explore Historical Places</h1>
          <div className="buttons-container">
            <Link to="/UserData" className="login-btn">Edit Details</Link>
            <Link to="/Form" className="form-btn">Add Details</Link>
            {/* <Link to="/Update" className="update-btn">Update</Link> */}
            <Link to="/Login" className="login-btn">Login</Link>
        </div>
        </header>
      </div>
      <div className='content'>
      <p>Welcome to our historical places exploration platform. Discover and learn about the fascinating historical landmarks around the world.</p>
      </div>
      <main className="main-content">
        <div className='data-container'>
          <Data />
        </div>
      </main>
    </div>
  );
}
