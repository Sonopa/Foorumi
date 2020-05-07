/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Tilasto -komponentti näyttää Äänestys tuloksen
/// Paul Kallio 4.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Segment, Statistic, Grid, Button, Icon} from 'semantic-ui-react'
import {setCurrentAihe} from '../reducers/aiheReducer'
import {updateAiheet} from '../actions/aiheetAction'
import {messageTypes, messageTime} from '../tools/Huomio'
import * as cloneDeep from 'lodash/cloneDeep'
const logger = require('simple-console-logger').getLogger('Tilasto')

/// Aihe TilastoItem
const TilastoItem = (props) => {
  return (
    <Statistic>
      <Statistic.Value>{props.arvo}</Statistic.Value>
      <Statistic.Label>{props.otsikko}</Statistic.Label>
    </Statistic>
  )
}

const PuolestaVastaan = (props) => (
  <Grid columns={2} padded grid>
    <Grid.Row>
      <Grid.Column>
        <div className='uiStat'>
          <Segment>
            <TilastoItem arvo={props.puolesta} otsikko="Puolesta"/>
          </Segment>
        </div>
      </Grid.Column>
      <Grid.Column>
        <div className='uiStat'>
          <Segment>
            <TilastoItem arvo={props.vastaan} otsikko="Vastaan"/>
          </Segment>
        </div>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
        <Button basic color='teal' size='fluid' onClick={props.voteFor}>
          <Icon name='heart' outlined />
          PUOLESTA
        </Button>
      </Grid.Column>
      <Grid.Column>
        <Button basic color='red' size='fluid' onClick={props.voteAgainst}>
          <Icon name='heartbeat' outlined />
          VASTAAN
        </Button>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

/// Tilasto komponentti
class Tilasto extends Component {

  voteFor = (event, {name}) => {
    event.preventDefault()
    logger.info('handleVoteFor:', this.props.aihe)
    const newAihe = cloneDeep(this.props.aihe)
    newAihe.votesFor++
    this.props.setCurrentAihe(cloneDeep(newAihe))
    this.props.updateAiheet(newAihe)
    this.props.setMessage(`${this.props.omistajaNimi} kannatti: ${newAihe.title}`, messageTypes.INFO)
    setTimeout(() => {
        this.props.setMessage('', messageTypes.CLOSE)
    }, messageTime.NORMAL)
  }

  voteAgainst = (event, {name}) => {
    event.preventDefault()
    logger.info('handleVoteAgainst:', this.props.aihe)
    const newAihe = cloneDeep(this.props.aihe)
    newAihe.votesAgainst++
    this.props.setCurrentAihe(cloneDeep(newAihe))
    this.props.updateAiheet(newAihe)
    this.props.setMessage(`${this.props.omistajaNimi} vastusti: ${newAihe.title}`, messageTypes.INFO)
    setTimeout(() => {
        this.props.setMessage('', messageTypes.CLOSE)
    }, messageTime.NORMAL)
  }

  render() {
    logger.info('Äänestystulos.aihe', this.props.aihe)
    return (
      <>
        <Segment stacked>
          <h2>Äänestystulos</h2>
        </Segment>
        <Segment>
          <PuolestaVastaan  puolesta={this.props.aihe.votesFor}
                            vastaan={this.props.aihe.votesAgainst}
                            voteFor={this.voteFor}
                            voteAgainst={this.voteAgainst}/>
        </Segment>
      </>
    )
  }
}

/// Tilasto -komponentti - Redux Tilankäsittely
const mapDispatchToProps = {
  setCurrentAihe,
  updateAiheet
}
export default withRouter(connect(null, mapDispatchToProps)(Tilasto))
