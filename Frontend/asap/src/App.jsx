import React from 'react';
import UserData from './components/UserData';
import Form from './components/Form';
import HistoricPlaces from './components/HistoricPlaces';
import Update from './components/Update';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Createdby from './components/Createdby';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HistoricPlaces/>}/>
        <Route path="/UserData" element={<UserData/>}/>
        <Route path='/Form' element={<Form/>}/>
        <Route path="/update/:id" element={<Update />} />
        <Route path='/Login'  element={<Login/>} />
        <Route path='/SignUp' element={<SignUp/>} />
        <Route path='/createdby' element={<Createdby/>} />
      </Routes>
    </div>
  );
};

export default App;
