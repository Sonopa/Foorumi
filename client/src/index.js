/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// index.js Ohjelman alku
/// Paul Kallio 16.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App'
import userReducer from './reducers/userReducer'
import './index.scss'

var logger = require('simple-console-logger')
// error
// info
// trace
// debug
logger.configure({level: 'info'})

const store = createStore(userReducer)

/// React käyttöliittymä kytketään aloitus -sivulle
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
