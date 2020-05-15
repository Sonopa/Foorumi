/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// AiheLomake -komponentti
/// Paul Kallio 1.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Segment, Button, Form, TextArea, Divider, Message} from 'semantic-ui-react'
import {messageTypes, messageTime} from '../common/Huomio'
import {checkAuth, getUserId} from '../../services/local/session'
import foorumiData from '../../services/foorumi'
import {withRouter} from 'react-router-dom'
import {VAALI} from '../common/valikko'
const logger = require('simple-console-logger').getLogger('AiheLomake')

/// aiheetAction
const tila = {
  SELAUS: 'selaus',
  LISAYS: 'lisays',
  POISTO: 'poisto'
}

/// Aihe lomake komponentti
class AiheLomake extends Component {

  isLive = true

  /// constructor
  constructor(props) {
    super(props)
    this.state = {
      uusiAihe: '',
      kuvaus:   '',
      tila:     tila.SELAUS
    }
  }

  /// componentWillUnmount
  componentWillUnmount() {
    this.isLive = false
  }

  /// componentDidUpdate
  componentDidUpdate(prevProps, prevState) {
     if(this.props.aiheId !== prevProps.aiheId) {
       logger.info("componentDidUpdate", this.inWork())
       if(this.inWork()) {
         this.clearForm()
         this.setTila(tila.SELAUS)
       }
     }
  }

  /// inWork
  inWork() {
    return this.state.tila !== tila.SELAUS
  }

  /// clearForm
  clearForm() {
    if(this.isLive) {
      this.setState({uusiAihe: '', kuvaus: ''})
    }
  }

  /// setUusiAihe
  setUusiAihe(uusiAihe) {
    if(this.isLive) {
      this.setState({uusiAihe: uusiAihe})
    }
  }

  /// setKuvaus
  setKuvaus(kuvaus) {
    if(this.isLive) {
      this.setState({kuvaus: kuvaus})
    }
  }

  /// setTila
  setTila(tila) {
    if(this.isLive) {
      this.setState({tila: tila})
    }
  }

  /// willAdd
  willAdd = (event, {name}) => {
    event.preventDefault()
    this.setTila(tila.LISAYS)
  }

  /// willDelete
  willDelete = (event, {name}) => {
    event.preventDefault()
    this.setTila(tila.POISTO)
  }

  /// restore
  restore = (event, {name}) => {
    event.preventDefault()
    this.clearForm()
    this.setTila(tila.SELAUS)
  }

  /// doDelete
  doDelete = (event, {name}) => {
    event.preventDefault()
    this.clearForm()
    this.setTila(tila.SELAUS)
    this.props.handleDelete()
  }

  /// doAdd
  doAdd = (event, {name}) => {
    event.preventDefault()
    let voteEndTime = new Date()
    voteEndTime = new Date(voteEndTime.getTime() + (24 * 60 * 60 * 1000))
    logger.info('voteEndTime', voteEndTime)
    const newAihe = {
        owner:        getUserId(),
        title:        this.state.uusiAihe,
        description:  this.state.kuvaus,
        voteEndTime:  voteEndTime
    }
    logger.info('handleSave.newAihe:', newAihe)
    foorumiData.create(newAihe)
      .then(responseData => {
        logger.info('handleSave.create:', responseData)
        this.clearForm()
        this.setTila(tila.SELAUS)
        this.props.setMessage(`Aihe ${newAihe.title} on lisätty Foorumille.`, messageTypes.INFO)
        this.props.refresh()
      })
      .catch(error => {
        logger.info('handleSave.catch:', error)
        const virhe = checkAuth(error) ? "Sessiosi on vanhentunut. Ole hyvä ja kirjaudu uudelleen." : error.message
        this.props.setMessage(virhe, messageTypes.WARNING)
      })
      .finally(() => {
        setTimeout(() => {
          this.props.setMessage('', messageTypes.CLOSE)
      }, messageTime.NORMAL)
    })
  }

  /// Swap to Vote page
  goVote = (event, {name}) => {
    event.preventDefault()
    this.props.history.push(VAALI)
  }

  // render
  render() {
    switch(this.state.tila) {
      case tila.SELAUS:
        return(
          <>
            <Button onClick={this.willAdd} primary>Lisää</Button>
            {
              this.props.isUserOwner ?
                <Button onClick={this.willDelete} primary>Poista</Button>
                : null
            }
            <Button onClick={this.goVote} primary>Äänestä</Button>
          </>
        )
      case tila.LISAYS:
        return(
          <>
            <Message info>
              <Message.Header>Lisää aihe</Message.Header>
            </Message>
            <Segment>
              <Form>
                <Form.Input label='Aihe' name='aihe' type='input'
                             onChange={(e) => this.setState({uusiAihe: e.target.value})} value={this.state.uusiAihe} />
                <div className='field'>
                  <label>Kuvaus</label>
                  <TextArea name='kuvaus'
                             onChange={(e) => this.setState({kuvaus: e.target.value})} value={this.state.kuvaus} />
                </div>
                <Divider horizontal hidden />
                <Button onClick={this.doAdd} primary>Tallenna</Button>
                <Button onClick={this.restore} secondary>Peruuta</Button>
              </Form>
            </Segment>
          </>
        )
      case tila.POISTO:
        return(
          <div>
            <Message warning>
              <Message.Header>Haluatko varmasti poistaa aiheen?</Message.Header>
            </Message>
            <Divider horizontal hidden />
            <Button onClick={this.doDelete} primary>Poista</Button>
            <Button onClick={this.restore} secondary>Peruuta</Button>
          </div>
        )
      default:
        return null
    }
  }
}

export default withRouter(AiheLomake)
