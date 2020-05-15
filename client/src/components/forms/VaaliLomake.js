/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// VaaliLomake -komponentti
/// Paul Kallio 1.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Segment, Button, Form, TextArea, Divider, Message} from 'semantic-ui-react'
import {messageTypes, messageTime} from '../common/Huomio'
import {checkAuth} from '../../services/local/session'
import foorumiData from '../../services/foorumi'
const logger = require('simple-console-logger').getLogger('VaaliLomake')

/// aiheetAction
const tila = {
  SELAUS: 'selaus',
  MUUTOS: 'muutos'
}

/// Aihe lomake komponentti
class VaaliLomake extends Component {

  isLive = true

  /// constructor
  constructor(props) {
    super(props)
    this.state = {
      aihe: this.props.aihe.title,
      kuvaus:   this.props.aihe.description,
      tila:     tila.SELAUS
    }
  }

  /// componentWillUnmount
  componentWillUnmount() {
    this.isLive = false
  }

  /// componentDidUpdate
  componentDidUpdate(prevProps, prevState) {
     if(this.props.aihe._id !== prevProps.aihe._id) {
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
      this.setState({aihe: '', kuvaus: ''})
    }
  }

  /// setUusiAihe
  setUusiAihe(aihe) {
    if(this.isLive) {
      this.setState({aihe: aihe})
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

  /// willChange
  willChange = (event, {name}) => {
    event.preventDefault()
    this.setTila(tila.MUUTOS)
  }

  /// restore
  restore = (event, {name}) => {
    event.preventDefault()
    this.clearForm()
    this.setTila(tila.SELAUS)
  }

  /// doAdd
  doChange = (event, {name}) => {
    event.preventDefault()
    const aihe = {
        ...this.props.aihe,
        title:        this.state.aihe,
        description:  this.state.kuvaus
    }
    logger.info('doChange.update:', aihe)
    foorumiData.update(this.props.aihe._id, aihe)
      .then(responseData => {
        logger.info('doChange.update:', responseData)
        this.clearForm()
        this.setTila(tila.SELAUS)
        this.props.setMessage(`Aihe ${aihe.title} on päivitetty.`, messageTypes.INFO)
        // this.props.refresh()
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

  // render
  render() {
    switch(this.state.tila) {
      case tila.SELAUS:
        return(
          <>
            {
              this.props.isUserOwner ?
                <Button onClick={this.willChange} basic color="teal">Päivitä</Button>
                : null
            }
          </>
        )
      case tila.MUUTOS:
        return(
          <>
            <Message info>
              <Message.Header>Päivitä keskusteluaihe</Message.Header>
            </Message>
            <Segment>
              <Form>
                <Form.Input label='Aihe' name='aihe' type='input'
                             onChange={(e) => this.setState({aihe: e.target.value})} value={this.state.aihe} />
                <div className='field'>
                  <label>Kuvaus</label>
                  <TextArea name='kuvaus'
                             onChange={(e) => this.setState({kuvaus: e.target.value})} value={this.state.kuvaus} />
                </div>
                <Divider horizontal hidden />
                <Button onClick={this.doChange} basic color="teal">Päivitä</Button>
                <Button onClick={this.restore} basic color="red">Peruuta</Button>
              </Form>
            </Segment>
          </>
        )
      default:
        return null
    }
  }
}

export default VaaliLomake
