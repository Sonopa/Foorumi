/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Keskustelut -komponentti sisältää Keskustelurivit
/// Paul Kallio 16.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import KeskusteluRivi from './KeskusteluRivi'
import Keskustelu from './Keskustelu'
import {messageTypes, messageTime} from '../tools/Huomio'
import keskusteluData from '../services/keskustelu'

const logger = require('simple-console-logger').getLogger('Keskustelut')

class Keskustelut extends Component {

  isLive = true

  constructor(props) {
    super(props)
    this.state = {
      keskustelut: [],
    }
  }

  componentWillUnmount() {
    this.isLive = false
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.aiheId !== prevProps.aiheId) {
      logger.info('componentDidUpdate.aiheId', this.props.aiheId)
      this.refresh()
    }
  }

  componentDidMount() {
    logger.info('componentDidMount.keskustelut', this.keskustelut)
    this.refresh()
  }

  refresh = () => {
    if(this.isLive ) {
      keskusteluData.getAll(this.props.aiheId)
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
                              refresh={this.refresh}
                              setMessage={this.props.setMessage}/>)
    })

    return (
      <div>
        <h1>Keskustelut</h1>
        {keskusteluRivit}
        <Keskustelu aiheId={this.props.aiheId} refresh={this.refresh} setMessage={this.props.setMessage} />
      </div>
    )
  }
}

export default Keskustelut
