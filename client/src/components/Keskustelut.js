/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Keskustelut -komponentti sisältää Keskustelurivit
/// Paul Kallio 16.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import KeskusteluRivi from './keskustelu/KeskusteluRivi'
import Keskustelu from './keskustelu/Keskustelu'
import {messageTypes, messageTime} from './common/Huomio'
import keskusteluData from '../services/keskustelu'

const logger = require('simple-console-logger').getLogger('Keskustelut')

/// Keskustelut
class Keskustelut extends Component {

  isLive = true

  /// constructor
  constructor(props) {
    super(props)
    this.state = {
      keskustelut: [],
    }
  }

  /// componentWillUnmount
  componentWillUnmount() {
    this.isLive = false
  }

  /// componentDidUpdate
  componentDidUpdate(prevProps, prevState) {
    if(this.props.aiheId !== prevProps.aiheId) {
      logger.info('componentDidUpdate.aiheId', this.props.aiheId)
      this.refresh()
    }
  }

  /// componentDidMount
  componentDidMount() {
    logger.info('componentDidMount.keskustelut', this.keskustelut)
    this.refresh()
  }

  /// refresh
  refresh = () => {
    logger.info('refresh', this.keskustelut)
    if(this.isLive ) {
      if(!this.props.aiheId) {
          this.setState({keskustelut: [], lisaaTila: false})
          return
      }
      keskusteluData.getAll(this.props.aiheId)
        .then(responseData => {
          logger.info('updateKeskustelut.responseData:', responseData)
          this.setState({keskustelut: responseData, lisaaTila: false})
        })
        .catch(exception => {
          logger.info('refresh.catch:', exception)
          this.props.setMessage(exception.message, messageTypes.ERROR)
        })
        .finally(() => {
          setTimeout(() => {
            this.props.setMessage('', messageTypes.CLOSE)
        }, messageTime.EXTRA)
      })
    }
  }

  /// render
  render() {
    const keskusteluRivit = this.state.keskustelut.map(keskustelu => {
      return (<KeskusteluRivi key={keskustelu._id}
                              keskustelu={keskustelu}
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
