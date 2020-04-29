/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Keskustelu -komponentti sisältää yhden keskustelun tiedot
/// Paul Kallio 21.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Form, TextArea, Button, Segment, Divider} from 'semantic-ui-react'
import keskusteluData from '../services/keskustelu'
import {isLoggedIn, checkAuth, getUser} from '../services/session'
import {messageTypes, messageTime} from './Huomio'

const logger = require('simple-console-logger').getLogger('Keskustelu')

class Keskustelu extends Component {

  isLive = true

  constructor(props) {
    super(props)
    logger.info('constructor.props:', props)

    this.state = {
      otsikko:  this.state ? this.state.otsikko : '',
      kommentti: this.state ? this.state.kommentti : '',
      lisaaTila: false
    }
  }

  componentWillUnmount() {
    this.isLive = false
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.aihe !== prevProps.aihe) {
      logger.trace('componentDidUpdate.aihe:', this.props.aihe)
      this.setState({otsikko: '', kommentti: '', lisaaTila: false})
      logger.trace('componentDidUpdate.lisaaTila:', false)
    }
  }

  render () {

    const handleAdd = (e, {name}) => this.setState({lisaaTila: true})
    const handleRestore = (e, {name}) =>
        this.setState({otsikko: '', kommentti: '', lisaaTila: false})
    const handleSave = (e, {name}) => {
      const newKeskustelu = {
          owner:  getUser(),
          title:  this.state.otsikko,
          text:   this.state.kommentti
      }
      keskusteluData.create(this.props.aihe, newKeskustelu)
        .then(responseData => {
          logger.info('handleSave.responseData:', responseData)
          this.setState({lisaaTila: false, otsikko: '', kommentti: ''})
          this.props.setMessage(`Mielipide ${newKeskustelu.title} on lisätty Foorumille.`, messageTypes.INFO)
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
      <>
        {isLoggedIn() ?
          this.state.lisaaTila  ?
            <Segment>
              <Form>
                <Form.Input label='Otsikko' name='otsikko' type='input'
                             onChange={(e) => this.setState({otsikko: e.target.value})} value={this.state.otsikko} />
                <div className='field'>
                  <label>Kommentti</label>
                  <TextArea name='kommentti'
                             onChange={(e) => this.setState({kommentti: e.target.value})} value={this.state.kommentti} />
                </div>
                <Divider horizontal hidden />
                <Button onClick={handleSave} primary>Tallenna</Button>
                <Button onClick={handleRestore} secondary>Peruuta</Button>
              </Form>
            </Segment> :
            <Button onClick={handleAdd} primary>Lisää</Button>
          : ''
        }
      </>
    )
  }
}

export default Keskustelu
