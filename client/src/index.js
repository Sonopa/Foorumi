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

let keskustelut = [{ id:"1",
          nimi:"Sami Kaarto",
          otsikko: "Epäilen laskelmia",
          aika:"5 tuntia sitten",
          kommentti:"Olemme pitkään vaimon kanssa keskutellut pururadan kustannusarviosta, ja meidän mielestä laskelmat on pahasti alikanttiin.",
          like:"4 puolesta"},
          {id:"2",
          nimi:"Siiri Peltonen",
          otsikko: "Pururadan puolesta",
          aika:"1 tunti sitten",
          kommentti:"Pururata on toki kallis, mutta tarpeellinen.",
          like:"4 puolesta"}
  ]

let aiheet= [ "Kierrätys on tärkeää",
              "Kaupungille on saatava katuvalot",
              "Lisää kuntopolkuja",
              "Moottoritien päällysteet uusittava",
              "Ylopistopaikat on tuplattava"]

ReactDOM.render(
  <React.StrictMode>
    <App keskustelut={keskustelut} aiheet={aiheet}/>
  </React.StrictMode>,
  document.getElementById('root')
);
