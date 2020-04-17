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
          like:"4 puolesta",
          tekija:"sami"},
          {id:"2",
          nimi:"Siiri Peltonen",
          otsikko: "Pururadan puolesta",
          aika:"1 tunti sitten",
          kommentti:"Pururata on toki kallis, mutta tarpeellinen.",
          like:"4 puolesta",
          tekija:"siiri"},
          {id:"3",
          nimi:"Seppo Liipola",
          otsikko: "Enemmän mäkiä",
          aika:"1 päivä sitten",
          kommentti:"Pururadassa on oltava riittävästi mäkiä.",
          like:"1 puolesta",
          tekija:"sepe"}
  ]

let aiheet=  [{id:"1", aihe:"Kierrätys on tärkeää", tekija:"sepe"},
              {id:"2", aihe:"Kaupungille on saatava katuvalot", tekija:"sepe"},
              {id:"3", aihe:"Lisää kuntopolkuja", tekija:"sepe"},
              {id:"4", aihe:"Moottoritien päällysteet uusittava", tekija:"tuiti"},
              {id:"5", aihe:"Yliopistopaikat on tuplattava", tekija:"tuiti"}]

ReactDOM.render(
  <React.StrictMode>
    <App keskustelut={keskustelut} aiheet={aiheet}/>
  </React.StrictMode>,
  document.getElementById('root')
);
