/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Vaali -komponentti
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Segment, List, Grid, Divider} from 'semantic-ui-react'
import Huomio, {messageTypes, messageTime} from '../tools/Huomio'
import {finnishDate} from '../tools/aika'
import Tilasto from '../components/Tilasto'
import foorumiData from '../services/foorumi'
import usersData from '../services/users'

const logger = require('simple-console-logger').getLogger('Vaali')

/// Aihe komponentti
const Aihe = (props) => {

  logger.info('Aihe.props', props)
  const otsikko   = props.aihe ? props.aihe.title: ''
  const ehdotus   = props.aihe ? props.aihe.description: ''
  const omistajaNimi  = props.aihe ? props.omistajaNimi: ''
  const aika      = props.aihe ? props.aihe.creationTime: ''
  return (
      <Grid>
          <Grid.Column>
        <Grid.Row>
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
        </Grid.Row>
            <Divider horizontal hidden />
        <Grid.Row>
            <Segment>
              <List>
                <List.Item>
                  Sisältö: {ehdotus}
                </List.Item>
              </List>
            </Segment>
        </Grid.Row>
          </Grid.Column>
      </Grid>
  )
}

/// Vaali komponentti
class Vaali extends Component {

  isLive = true

  constructor(props) {
    super(props)
    this.state = {
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
    // if(this.props.aihe !== this.state.aihe) {
      foorumiData.getAihe(this.props.aihe.id)
        .then(responseData => {
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
    // }
    return true
  }

  setMessage = (messu, messuTyyppi) => {
    if(this.isLive) {
      logger.trace('setMessage:', messu, messuTyyppi)
      this.setState({messu: messu, messuTyyppi: messuTyyppi})
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
          <Grid columns={2}>
              <Grid.Column>
                <Segment stacked>
                  <h2>Äänestettävä asia</h2>
                </Segment>
                <Aihe aihe={this.props.aihe} omistajaNimi={this.state.omistajaNimi}/>
              </Grid.Column>
              <Grid.Column>
                <Tilasto aihe={this.props.aihe} />
              </Grid.Column>
          </Grid>
        </Segment>
      </>
    )
  }
}

/// Vaali -komponentti (Äänestys) - Redux Tilankäsittely
const mapStateToProps = state => {
  return {
    aihe: state.aihe
  }
}
export default connect(mapStateToProps, null)(Vaali)
