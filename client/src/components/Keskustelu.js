/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Keskustelu -komponentti sisältää Keskustelurivit
/// Paul Kallio 16.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Logger} from 'react-logger-lib'
import KeskusteluRivi from './KeskusteluRivi'
import keskusteluData from '../services/keskustelu'

class Keskustelu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      keskustelut: this.state ? this.state.keskustelut : [],
      oldAihe: this.state ? this.state.oldAihe : ''
    }
  }

  componentWillMount() {
    if(this.state.oldAihe !== this.props.aihe) {
      this.setState({oldAihe: this.props.aihe})
      keskusteluData.getAll(this.props.aihe)
        .then(responseData => {
          Logger.of('Keskustelu.getDerivedStateFromProps').info('responseData', responseData)
          this.setState({keskustelut: responseData})
        })
    }
    return null;
  }

  updateKeskustelut = ()  => {
    if(this.state.oldAihe !== this.props.aihe) {
      this.setState({oldAihe: this.props.aihe})
      Logger.of('Keskustelu.updateKeskustelut').info('aihe', this.props.aihe)
      keskusteluData.getAll(this.props.aihe)
        .then(responseData => {
          Logger.of('Keskustelu.updateKeskustelut').info('responseData', responseData)
          this.setState({keskustelut: responseData})
        })
    }
  }

 componentDidUpdate() {
    Logger.of('Keskustelu.componentDidUpdate').info('oldAihe', this.state.oldAihe)
    this.updateKeskustelut()
  }

  render() {
    Logger.of('Keskustelu.render.state').info('keskustelut', this.state.keskustelut)
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
