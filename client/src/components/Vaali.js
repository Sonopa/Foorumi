/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Vaali -komponentti
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Segment, List, Grid, Divider} from 'semantic-ui-react'
import Huomio, {messageTypes} from './common/Huomio'
import {finnishDate} from './common/aika'
import Tilasto from './vaali/Tilasto'
import usersData from '../services/users'

const logger = require('simple-console-logger').getLogger('Vaali')

/// Aihe komponentti
const Aihe = (props) => {

  logger.info('Aihe.props', props)
  const otsikko   = props.aihe ? props.aihe.title: ''
  const ehdotus   = props.aihe ? props.aihe.description: ''
  const omistajaNimi  = (props.aihe && props.aihe.owner) ? props.aihe.owner.name: ''
  const aika      = props.aihe ? props.aihe.createdAt: ''
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

  /// constructor
  constructor(props) {
    super(props)
    this.state = {
      omistajaNimi: '',
      messu: '',
      messuTyyppi: messageTypes.CLOSE
    }
  }

  /// componentWillUnmount
  componentWillUnmount() {
    this.isLive = false
  }

  /// setUserName
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

  /// componentDidMount
  componentDidMount() {
    if(this.isLive) {
      this.setUserName(this.props.aihe.owner)
    }
  }

  /// componentDidUpdate
  componentDidUpdate(prevProps, prevState) {
    if(this.isLive) {
      if(this.props.aihe !== prevProps.aihe) {
          this.setUserName(this.props.aihe.owner)
      }
    }
  }

  /// setMessage
  setMessage = (messu, messuTyyppi) => {
    if(this.isLive) {
      logger.info('setMessage:', messu, messuTyyppi)
      this.setState({messu: messu, messuTyyppi: messuTyyppi})
    }
  }

  /// setOmistaja
  setOmistaja = (responseData) => {
    if(this.isLive) {
      logger.info('setOmistaja:', responseData)
      this.setState({omistajaNimi: responseData})
    }
  }

  /// render
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
                <Aihe aihe={this.props.aihe}/>
              </Grid.Column>
              <Grid.Column>
                <Tilasto aihe={this.props.aihe} setMessage={this.setMessage} />
              </Grid.Column>
          </Grid>
        </Segment>
      </>
    )
  }
}
/// Tilasto -komponentti - Redux Tilankäsittely
const mapStateToProps = state => {
  return {
    aihe: state.aihe
  }
}
export default withRouter(connect(mapStateToProps, null)(Vaali))
