/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Keskustelu -komponentti sisältää Keskustelurivit
/// Paul Kallio 16.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import KeskusteluRivi from './KeskusteluRivi.js'

class Keskustelu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      list:  [{ id:"1",
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
      }
  }

  render() {

    const keskusteluRivit = this.state.list.map(keskustelu => {
      return (<KeskusteluRivi key={keskustelu.id}
                              nimi={keskustelu.nimi}
                              otsikko={keskustelu.otsikko}
                              aika={keskustelu.aika}
                              kommentti={keskustelu.kommentti}
                              like={keskustelu.like} />)
    })

    return (
      <div>
        <h1>Keskustelut</h1>
        {keskusteluRivit}
      </div>
    )
  }
}

export default Keskustelu
