/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Keskustelu -komponentti sisältää Keskustelurivit
/// Paul Kallio 16.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import KeskusteluRivi from './KeskusteluRivi'
import keskusteluData from '../services/keskustelu'

const logger = require('simple-console-logger').getLogger('Keskustelu')

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
          logger.info('componentWillMount.responseData:', responseData)
          this.setState({keskustelut: responseData})
        })
    }
    return null;
  }

  updateKeskustelut = ()  => {
    if(this.state.oldAihe !== this.props.aihe) {
      this.setState({oldAihe: this.props.aihe})
      keskusteluData.getAll(this.props.aihe)
        .then(responseData => {
          logger.info('updateKeskustelut.responseData:', responseData)
          this.setState({keskustelut: responseData})
        })
    }
  }

 componentDidUpdate() {
    logger.trace('componentDidUpdate.oldAihe:', this.state.oldAihe)
    this.updateKeskustelut()
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
