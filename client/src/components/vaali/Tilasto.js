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
import {createFor, createAgainst, /* hasVoted,*/ choice} from '../common/choice'
import foorumiData from '../../services/foorumi'

import * as cloneDeep from 'lodash/cloneDeep'
const logger = require('simple-console-logger').getLogger('Tilasto')

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
    foorumiData.vote(this.props.aihe._id, createFor())
      .then(responseData => {
        logger.info('foorumiData.puolesta', responseData)
        this.props.setMessage(`${this.props.user.username} kannatti: ${this.props.aihe.title}`, messageTypes.INFO)
        const newAihe = cloneDeep(this.props.aihe)
        newAihe.votes.push(createFor())
        this.props.setCurrentAihe(cloneDeep(newAihe))
        this.props.updateAiheet(newAihe)
      })
      .catch(error => {
        logger.info('foorumiData.puolesta:', error)
        this.props.setMessage(error.message, messageTypes.WARNING)
      })
      .finally(() => {
        setTimeout(() => {
          this.props.setMessage('', messageTypes.CLOSE)
        }, messageTime.NORMAL)
    })
  }

  /// voteAgainst
  voteAgainst = (event, {name}) => {
    event.preventDefault()
    logger.info('handleVoteAgainst:', this.props)
    foorumiData.vote(this.props.aihe._id, createAgainst())
      .then(responseData => {
        logger.info('foorumiData.vastaan', responseData)
        this.props.setMessage(`${this.props.user.username} vastusti: ${this.props.aihe.title}`, messageTypes.INFO)
        const newAihe = cloneDeep(this.props.aihe)
        newAihe.votes.push(createAgainst())
        this.props.setCurrentAihe(cloneDeep(newAihe))
        this.props.updateAiheet(newAihe)
      })
      .catch(error => {
        logger.info('foorumiData.vastaan:', error)
        this.props.setMessage(error.message, messageTypes.WARNING)
      })
      .finally(() => {
        setTimeout(() => {
          this.props.setMessage('', messageTypes.CLOSE)
        }, messageTime.NORMAL)
    })
  }

  /// getPuolesta
  getPuolesta = (aihe) => {
      if(aihe.votes && aihe.votes.length > 0) {
        return aihe.votes.filter(item => item.choice === choice.PUOLESTA).length
      }
      return 0
  }

  /// getVastaan
  getVastaan = (aihe) => {
      if(aihe.votes && aihe.votes.length > 0) {
        return aihe.votes.filter(item => item.choice === choice.VASTAAN).length
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
