/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Keskustelut -komponentti sisältää Keskustelurivit
/// Paul Kallio 16.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import KeskusteluRivi from './KeskusteluRivi'
import Keskustelu from './Keskustelu'
import keskusteluData from '../services/keskustelu'

const logger = require('simple-console-logger').getLogger('Keskustelut')

class Keskustelut extends Component {

  constructor(props) {
    super(props)
    this.state = {
      keskustelut: this.state ? this.state.keskustelut : [],
      aihe: this.state ? this.state.aihe : '',
    }
  }

  componentWillMount() {
    if(this.state.aihe !== this.props.aihe) {
      this.setState({aihe: this.props.aihe})
      keskusteluData.getAll(this.props.aihe)
        .then(responseData => {
          logger.info('componentWillMount.responseData:', responseData)
          this.setState({keskustelut: responseData})
        })
    }
    return null;
  }

 componentDidUpdate() {
    if(this.state.aihe !== this.props.aihe) {
      this.setState({aihe: this.props.aihe})
      keskusteluData.getAll(this.props.aihe)
        .then(responseData => {
          logger.info('updateKeskustelut.responseData:', responseData)
          this.setState({keskustelut: responseData, lisaaTila: false})
        })
    }
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
        <Keskustelu aihe={this.state.aihe} />
      </div>
    )
  }
}

export default Keskustelut
