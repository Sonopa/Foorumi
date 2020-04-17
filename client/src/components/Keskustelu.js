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
      keskustelut: []
    }
  }

  static getDerivedStateFromProps(props, state) {
      Logger.of('Keskustelu.getDerivedStateFromProps.keskustelu').info('props', props)
      Logger.of('Keskustelu.getDerivedStateFromProps.keskustelu').info('state', state)
      return {keskustelut: props.keskustelut}
  }

  render() {
    const keskusteluRivit = this.state.keskustelut.map(keskustelu => {
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
