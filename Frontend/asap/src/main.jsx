// Import necessary modules
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import from "react-dom/client" instead of "react-dom"
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Use createRoot instead of ReactDOM.render
const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
