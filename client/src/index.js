/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// index.js Ohjelman alku
/// Paul Kallio 16.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
var logger = require('simple-console-logger')
// error
// info
// trace
// debug
logger.configure({level: 'info'})

/// React käyttöliittymä kytketään aloitus -sivulle
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
