import React from 'react';
import UserData from './components/UserData';
import Form from './components/Update';
import HistoricPlaces from './components/HistoricPlaces';
import Update from './components/Update';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';

const App = () => {
  return (
<div>
  <Routes>
    <Route path="/" element={<HistoricPlaces/>}/>
    <Route path="/UserData" element={<UserData/>}/>
    <Route path='/Form' element={<Form/>}/>
    <Route path='/Update/:id'  element={<Update/>} />
    <Route path='/Login'  element={<Login/>} />
    <Route path='/SignUp' element={<SignUp/>} />
  </Routes>
</div>
  );
};

export default App;
