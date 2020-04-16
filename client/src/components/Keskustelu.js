/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Keskustelu -komponentti sisältää Keskustelurivit
/// Paul Kallio 16.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Logger} from 'react-logger-lib'
import KeskusteluRivi from './KeskusteluRivi.js'

class Keskustelu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      list: this.props.keskustelut
    }
  }

  render() {

    const keskusteluRivit = this.state.list.map(keskustelu => {
      Logger.of('Keskustelu.render.keskustelu').warn('keskustelu', keskustelu)
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
