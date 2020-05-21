/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Kommentit -komponentti sisältää yhden keskustelun kommentit
/// Paul Kallio 18.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import Kommentti from './Kommentti'
import kommenttiData from '../../services/kommentti'
import {messageTypes, messageTime} from '../common/Huomio'

const logger = require('simple-console-logger').getLogger('Kommentit')

/// Kommentit
class Kommentit extends Component {

  isLive = true

  /// constructor
  constructor(props) {
    super(props)
    this.state = {
      kommentit: [],
    }
  }

  /// componentWillUnmount
  componentWillUnmount() {
    this.isLive = false
  }

  /// componentDidMount
  componentDidMount() {
    logger.info('componentDidMount.keskusteluId', this.props.keskusteluId)
    this.refresh()
  }

  /// componentDidUpdate
  componentDidUpdate(prevProps, prevState) {
    if(this.props.keskusteluId !== prevProps.keskusteluId || this.props.doRefresh) {
      logger.info('componentDidUpdate.keskusteluId', this.props.keskusteluId)
      this.refresh()
    }
  }

  /// setKommentit
  setKommentit = (kommentit) => {
    if(this.isLive) {
      this.setState({kommentit: kommentit})
    }
  }

  /// refresh
  refresh = () => {
    if(!this.props.keskusteluId) {
        return
    }
    kommenttiData.getAll(this.props.topicIdId, this.props.keskusteluId)
      .then(response => {
        logger.info('kommenttiData.kommentit:', response)
        this.setKommentit(response.comment_list)
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

  /// render
  render () {
    logger.info("render.keskustelu", this.props.keskusteluId)
    if(!this.state.kommentit || this.state.kommentit.length <= 0) {
      return null
    }
    const kommentiLohko =  this.state.kommentit.map(kommentti => {
        return (<Kommentti key={kommentti._id} kommentti={kommentti} refresh={this.refresh}/>)})

    logger.info("render.keskustelu", kommentiLohko)

    return (kommentiLohko)
  }
}
export default Kommentit
