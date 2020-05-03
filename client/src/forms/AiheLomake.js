/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// AiheLomake -komponentti
/// Paul Kallio 1.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Button, Form, TextArea, Divider} from 'semantic-ui-react'
import {messageTypes, messageTime} from '../tools/Huomio'
import {checkAuth, getUserId} from '../tools/session'
import foorumiData from '../services/foorumi'
const logger = require('simple-console-logger').getLogger('AiheLomake')

/// AiheLomake komponentti
class AiheLomake extends Component {

  constructor(props) {
    super(props)
    this.state = {
      uusiAihe:   this.state ? this.state.uusiAihe : '',
      kuvaus:     this.state ? this.state.kuvaus : '',
      lisaaTila:  this.state ? this.state.lisaaTila : false
    }
  }

  componentDidUpdate(prevProps, prevState) {
     if(this.props.currentItem !== prevProps.currentItem) {
       logger.trace('componentDidUpdate.props.aihe:', this.props.currentItem)
       if(this.state.lisaaTila) {
         this.setState({uusiAihe: '', kuvaus: '', lisaaTila: false})
       }
     }
  }

  render() {

    const handleAdd = (event, {name}) => {
      event.preventDefault()
      this.setState({lisaaTila: true})
    }

    const handleRestore = (event, {name}) => {
      event.preventDefault()
      this.setState({uusiAihe: '', kuvaus: '', lisaaTila: false})
    }

    const handleSave = (event, {name}) => {
      event.preventDefault()
      const newAihe = {
          owner:        getUserId(),
          title:        this.state.uusiAihe,
          description:  this.state.kuvaus
      }
      foorumiData.create(newAihe)
        .then(responseData => {
          logger.info('handleSave.create:', responseData)
          this.setState({lisaaTila: false, uusiAihe: '', kuvaus: ''})
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

    return (
        this.state.lisaaTila ?
          <Form>
            <Form.Input label='Aihe' name='aihe' type='input'
                         onChange={(e) => this.setState({uusiAihe: e.target.value})} value={this.state.uusiAihe} />
            <div className='field'>
              <label>Kuvaus</label>
              <TextArea name='kuvaus'
                         onChange={(e) => this.setState({kuvaus: e.target.value})} value={this.state.kuvaus} />
            </div>
            <Divider horizontal hidden />
            <Button onClick={handleSave} primary>Tallenna</Button>
            <Button onClick={handleRestore} secondary>Peruuta</Button>
          </Form>
        :
        <>
          <Button onClick={handleAdd} primary>Lisää</Button>
          <Button onClick={this.props.handleDelete} primary>Poista</Button>
        </>
    )
  }
}

export default AiheLomake
