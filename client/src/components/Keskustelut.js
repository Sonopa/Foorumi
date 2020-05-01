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
import {messageTypes, messageTime} from './Huomio'

const logger = require('simple-console-logger').getLogger('Keskustelut')

class Keskustelut extends Component {

  isLive = true

  constructor(props) {
    super(props)
    logger.info('constructor.props.aihe', props.aihe, (typeof props.aihe))
    this.state = {
      keskustelut: this.state ? this.state.keskustelut : [],
    }
  }

  componentWillUnmount() {
    this.isLive = false
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.aihe !== prevProps.aihe) {
      keskusteluData.getAll(this.props.aihe)
        .then(responseData => {
          logger.info('updateKeskustelut.responseData:', responseData)
          this.setState({keskustelut: responseData, lisaaTila: false})
        })
      .catch(exception => {
        logger.info('handleSave.catch:', exception)
        this.props.setMessage(exception.message, messageTypes.ERROR)
      })
      .finally(() => {
        setTimeout(() => {
          this.props.setMessage('', messageTypes.CLOSE)
      }, messageTime.EXTRA)
    })
    }
  }

  render() {
    const keskusteluRivit = this.state.keskustelut.map(keskustelu => {
      return (<KeskusteluRivi key={keskustelu.id}
                              id={keskustelu.id}
                              aihe={keskustelu.topic}
                              omistaja={keskustelu.owner}
                              otsikko={keskustelu.title}
                              aika={keskustelu.creationTime}
                              kommentti={keskustelu.text}
                              like={keskustelu.likes}
                              disLike={keskustelu.dislikes}
                              setMessage={this.props.setMessage}/>)
    })

    return (
      <div>
        <h1>Keskustelut</h1>
        {keskusteluRivit}
        <Keskustelu aihe={this.props.aihe} setMessage={this.props.setMessage} />
      </div>
    )
  }
}

export default Keskustelut
