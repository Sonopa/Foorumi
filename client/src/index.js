/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// index.js Ohjelman alku
/// Paul Kallio 16.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import aiheReducer from './reducers/aiheReducer'
import aiheetReducer from './reducers/aiheetReducer'
import './index.scss'

var logger = require('simple-console-logger')
// error
// info
// trace
// debug
logger.configure({level: 'info'})

const reducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  aihe: aiheReducer,
  aiheet: aiheetReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

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
