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
import {setCurrentAihe} from '../../stores/actions/aiheAction'
import {updateAiheet} from '../../stores/actions/aiheetAction'
import {messageTypes, messageTime} from '../common/Huomio'
import {isLoggedIn} from '../../services/local/session'
import * as cloneDeep from 'lodash/cloneDeep'
const logger = require('simple-console-logger').getLogger('Tilasto')

const VOTES_ARRAY = 0
const ckeckArray = (aihe) => {
    if(aihe.votes.length === 0) {
      aihe.votes.push({VOTE_FOR:0, VOTE_AGAINST:0})
    }
}

/// Tilasto Item komponentti
const TilastoItem = (props) => {
  return (
    <Statistic>
      <Statistic.Value>{props.arvo}</Statistic.Value>
      <Statistic.Label>{props.otsikko}</Statistic.Label>
    </Statistic>
  )
}

/// Äänestä -komponentti
const VotePainikkeet = (props) => {
  if(!isLoggedIn()) {
    return null
  }
  return (
    <Grid.Row>
      <Grid.Column>
        <Button basic color='teal' fluid onClick={props.voteFor}>
          <Icon name='heart'/>
          PUOLESTA
        </Button>
      </Grid.Column>
      <Grid.Column>
        <Button basic color='red' fluid onClick={props.voteAgainst}>
          <Icon name='heartbeat'/>
          VASTAAN
        </Button>
      </Grid.Column>
    </Grid.Row>
  )
}

/// Puolesta Vastaan komponentti
const PuolestaVastaan = (props) => (
  <Grid columns={2} padded>
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
    <VotePainikkeet voteFor={props.voteFor} voteAgainst={props.voteAgainst}/>
  </Grid>
)

/// Tilasto komponentti
class Tilasto extends Component {

  /// voteFor
  voteFor = (event, {name}) => {
    event.preventDefault()
    logger.info('handleVoteFor:', this.props)
    const newAihe = cloneDeep(this.props.aihe)
    ckeckArray(newAihe)
    newAihe.votes[VOTES_ARRAY].VOTE_FOR++
    this.props.setCurrentAihe(cloneDeep(newAihe))
    this.props.updateAiheet(newAihe)
    this.props.setMessage(`${this.props.user.username} kannatti: ${newAihe.title}`, messageTypes.INFO)
    setTimeout(() => {
        this.props.setMessage('', messageTypes.CLOSE)
    }, messageTime.NORMAL)
  }

  /// voteAgainst
  voteAgainst = (event, {name}) => {
    event.preventDefault()
    logger.info('handleVoteAgainst:', this.props)
    const newAihe = cloneDeep(this.props.aihe)
    ckeckArray(newAihe)
    newAihe.votes[VOTES_ARRAY].VOTE_AGAINST++
    this.props.setCurrentAihe(cloneDeep(newAihe))
    this.props.updateAiheet(newAihe)
    this.props.setMessage(`${this.props.user.username} vastusti: ${newAihe.title}`, messageTypes.INFO)
    setTimeout(() => {
        this.props.setMessage('', messageTypes.CLOSE)
    }, messageTime.NORMAL)
  }

  /// getPuolesta
  getPuolesta = (aihe) => {
      if(aihe.votes && aihe.votes.length > 0) {
        return aihe.votes[VOTES_ARRAY].VOTE_FOR
      }
      return 0
  }

  /// getVastaan
  getVastaan = (aihe) => {
      if(aihe.votes && aihe.votes.length > 0) {
        return aihe.votes[VOTES_ARRAY].VOTE_AGAINST
      }
      return 0
  }

  /// render
  render() {
    return (
      <>
        <Segment stacked>
          <h2>Äänestystulos</h2>
        </Segment>
        <Segment>
          <PuolestaVastaan  puolesta={this.getPuolesta(this.props.aihe)}
                            vastaan={this.getVastaan(this.props.aihe)}
                            voteFor={this.voteFor}
                            voteAgainst={this.voteAgainst}/>
        </Segment>
      </>
    )
  }
}

/// Tilasto -komponentti - Redux Tilankäsittely
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setCurrentAihe,
  updateAiheet
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tilasto))
