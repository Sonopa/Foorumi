/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Login -komponentti
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Segment, Statistic, List, Grid} from 'semantic-ui-react'
import Huomio, {messageTypes, messageTime} from './Huomio'
import foorumiData from '../services/foorumi'
import usersData from '../services/users'
import {finnishDate} from '../services/tools'

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
  const puolesta =  props.aihe ? props.aihe.votesFor: 0
  const vastaan =   props.aihe ? props.aihe.votesAgainst: 0

  return (
    <Segment>
      <Segment stacked>
        <h2>Äänestystulos</h2>
      </Segment>
      <Statistic.Group>
        <TilastoItem arvo={puolesta} otsikko="Puolesta"/>
        <TilastoItem arvo={vastaan} otsikko="Vastaan"/>
      </Statistic.Group>
    </Segment>
  )
}

const Aihe = (props) => {

  logger.info('Aihe.props', props)
  const otsikko   = props.aihe ? props.aihe.title: ''
  const ehdotus   = props.aihe ? props.aihe.description: ''
  const omistajaNimi  = props.aihe ? props.omistajaNimi: ''
  const aika      = props.aihe ? props.aihe.creationTime: ''
  return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <List>
                <List.Item>
                  Asia: {otsikko}
                </List.Item>
                <List.Item>
                  Tekijä: {omistajaNimi}
                </List.Item>
                <List.Item>
                  Luontiaika: {finnishDate(aika)}
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <List>
                <List.Item>
                  Sisältö: {ehdotus}
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  )
}

class Vaali extends Component {

  isLive = true

  constructor(props) {
    super(props)
    this.state = {
      aihe: null,
      omistajaNimi: '',
      messu: '',
      messuTyyppi: messageTypes.CLOSE
    }
  }

  componentWillUnmount() {
    this.isLive = false
  }

  setUserName = (userId) => {
      if(userId > 0) {
        usersData.getUser(userId)
            .then(responseData => {
            logger.info('findUserName.usersData', responseData)
            this.setOmistaja(responseData.name)
          })
          .catch(exception => {
            logger.info('findUserName.catch:', exception)
        })
      }
  }

  componentDidMount() {
    if(this.props.aihe !== this.state.aihe) {
      foorumiData.getAihe(this.props.aihe)
        .then(responseData => {
          this.setAihe(responseData)
          logger.info('componentDidMount.responseData:', responseData)
          this.setUserName(responseData.owner)
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
    }
    return true
  }

  setMessage = (messu, messuTyyppi) => {
    if(this.isLive) {
      logger.trace('setMessage:', messu, messuTyyppi)
      this.setState({messu: messu, messuTyyppi: messuTyyppi})
    }
  }

  setAihe = (responseData) => {
    if(this.isLive) {
      logger.trace('setAihe:', responseData)
      this.setState({aihe: responseData})
    }
  }

  setOmistaja = (responseData) => {
    if(this.isLive) {
      logger.info('setOmistaja:', responseData)
      this.setState({omistajaNimi: responseData})
    }
  }

  render() {
    return (
      <>
        <Huomio teksti={this.state.messu} tyyppi={this.state.messuTyyppi} />
        <Segment raised>
          <h1>Äänestyspaikka</h1>
          <Aihe aihe={this.state.aihe} aiheId={this.props.aihe} omistajaNimi={this.state.omistajaNimi}/>
          <Tilasto aihe={this.state.aihe} />
        </Segment>
      </>
    )
  }
}

export default Vaali
