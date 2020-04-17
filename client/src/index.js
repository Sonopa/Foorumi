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

let keskustelut =[{ id:"1",
          nimi:"Sami Kaarto",
          otsikko: "Epäilen laskelmia",
          aika:"5 tuntia sitten",
          kommentti:"Olemme pitkään vaimon kanssa keskustellut pururadan kustannusarviosta, ja meidän mielestä laskelmat on pahasti alikanttiin.",
          like:"4 puolesta",
          owner:"sami"},
          {id:"2",
          nimi:"Siiri Peltonen",
          otsikko: "Pururadan puolesta",
          aika:"1 tunti sitten",
          kommentti:"Pururata on toki kallis, mutta tarpeellinen.",
          like:"4 puolesta",
          owner:"siiri"},
          {id:"3",
          nimi:"Seppo Liipola",
          otsikko: "Enemmän mäkiä",
          aika:"1 päivä sitten",
          kommentti:"Pururadassa on oltava riittävästi mäkiä.",
          like:"1 puolesta",
          owner:"sepe"}
  ]

let aiheet=  [ /*
              {"id":"1", "title":"Kierrätys on tärkeää", "owner":"sepe"},
              {"id":"2", "title":"Kaupungille on saatava katuvalot", "owner":"sepe"},
              {"id":"3", "title":"Lisää kuntopolkuja", "owner":"sepe"},
              {"id":"4", "title":"Moottoritien päällysteet uusittava", "owner":"tuiti"},
              {"id":"5", "title":"Yliopistopaikat on tuplattava", "owner":"tuiti"},
              {"id":"6", "title":"Hanhet on ajettava kaupungista", "owner":"jupe"},
              {"id":"7", "title":"Citybiket on makeita", "owner":"jupe"},
              {"id":"8", "title":"Lukion katto maalattava", "owner":"jupe"}
              */ ]

ReactDOM.render(
  <React.StrictMode>
    <App keskustelut={keskustelut} aiheet={aiheet}/>
  </React.StrictMode>,
  document.getElementById('root')
);
