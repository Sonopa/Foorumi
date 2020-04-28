/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Login -komponentti
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Segment, Statistic, List} from 'semantic-ui-react'
import Huomio, {messageTypes, messageTime} from './Huomio'
import foorumiData from '../services/foorumi'

const logger = require('simple-console-logger').getLogger('Vaali')
const TilastoItem = (props) => {
  return (
    <Statistic>
      <Statistic.Value>{props.arvo}</Statistic.Value>
      <Statistic.Label>{props.otsikko}</Statistic.Label>
    </Statistic>
  )
}

const Tilasto = (props) => {
  const puolesta = 25 /* this.props.aihe ? this.props.aihe.votesFor: 0 */
  const vastaan =  24 /* this.props.aihe ? this.props.aihe.votesAgainst: 0 */
  const poissa =  10 /* this.props.aihe ? this.props.aihe.votesNo: 0 */
  return (
    <Segment>
      <Segment stacked>
        <h2>Äänestystulos</h2>
      </Segment>
      <Statistic.Group>
        <TilastoItem arvo={puolesta} otsikko="Puolesta"/>
        <TilastoItem arvo={vastaan} otsikko="Vastaan"/>
        <TilastoItem arvo={poissa} otsikko="Tyhjiä"/>
      </Statistic.Group>
    </Segment>
  )
}

const Aihe = (props) => {
  const id    = props.aiheId // props.aihe ? props.aihe.id: ''
  const title = props.aihe ? props.aihe.title: ''
  const owner = props.aihe ? props.aihe.owner: ''
  return (
    <Segment>
      <List>
        <List.Item>
          {title}
        </List.Item>
        <List.Item>
          Tekijä: {owner}
        </List.Item>
        <List.Item>
          Numero: {id}
        </List.Item>
      </List>
    </Segment>
  )
}

class Vaali extends Component {

  isLive = true

  constructor(props) {
    super(props)
    this.state = {
      aihe: null,
      messu: '',
      messuTyyppi: messageTypes.CLOSE,
    }
  }

  componentWillUnmount() {
    this.isLive = false
  }

  componentDidMount() {
    foorumiData.getAihe(this.props.aihe)
      .then(responseData => {
        this.setAihe(responseData)
        logger.info('componentDidMount.responseData:', responseData)
      })
      .catch(exception => {
        logger.info('componentDidMount.catch:', exception)
        this.setMessage(exception.message, messageTypes.ERROR)
      })
      .finally(() => {
        setTimeout(() => {
          this.setMessage('', messageTypes.CLOSE)
        }, messageTime.EXTRA)
    })
    return true
  }

  setMessage = (messu, messuTyyppi) => {
    if(this.isLive) {
      logger.error('setMessage:', messu, messuTyyppi)
      this.setState({messu: messu, messuTyyppi: messuTyyppi})
    }
  }

  setAihe = (responseData) => {
    if(this.isLive) {
      logger.error('setAihe:', responseData)
      this.setState({aihe: responseData})
    }
  }

  render() {
    return (
      <>
        <Huomio teksti={this.state.messu} tyyppi={this.state.messuTyyppi} />
        <Segment raised>
          <h1>Äänestyspaikka</h1>
          <Aihe aihe={this.state.aihe} aiheId={this.props.aihe} />
          <Tilasto aihe={this.state.aihe} />
        </Segment>
      </>
    )
  }
}

export default Vaali
