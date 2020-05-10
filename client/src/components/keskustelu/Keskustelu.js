/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Keskustelu -komponentti sisältää yhden keskustelun tiedot
/// Paul Kallio 21.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Form, TextArea, Button, Segment, Divider} from 'semantic-ui-react'
import {messageTypes, messageTime} from '../common/Huomio'
import {isLoggedIn, checkAuth, getUser} from '../../tools/session'
import keskusteluData from '../../services/keskustelu'

const logger = require('simple-console-logger').getLogger('Keskustelu')

/// Keskustelu
class Keskustelu extends Component {

  isLive = true
  constructor(props) {
    super(props)
    logger.info('constructor.props:', props)

    this.state = {
      otsikko: '',
      kommentti: '',
      lisaaTila: false
    }
    this.handleAdd      = this.handleAdd.bind(this)
    this.handleRestore  = this.handleRestore.bind(this)
    this.handleSave     = this.handleSave.bind(this)
  }

  /// componentWillUnmount
  componentWillUnmount() {
    this.isLive = false
  }

  /// componentDidUpdate
  componentDidUpdate(prevProps, prevState) {
    if(this.isLive) {
      if(this.props.aiheId !== prevProps.aiheId) {
        logger.info('componentDidUpdate.aiheId:', this.props.aiheId)
        this.setState({otsikko: '', kommentti: '', lisaaTila: false})
      }
    }
  }

  /// handleAdd
  handleAdd = (event, {name}) => {
    event.preventDefault()
    this.setState({lisaaTila: true})
  }

  /// handleRestore
  handleRestore = (event, {name}) => {
    event.preventDefault()
    this.setState({otsikko: '', kommentti: '', lisaaTila: false})
  }

  /// handleSave
  handleSave = (event, {name}) => {
    event.preventDefault()
    const newKeskustelu = {
        owner:  getUser(),
        title:  this.state.otsikko,
        text:   this.state.kommentti
    }
    keskusteluData.create(this.props.aiheId, newKeskustelu)
      .then(responseData => {
        logger.info('handleSave.responseData:', responseData)
        this.setState({lisaaTila: false, otsikko: '', kommentti: ''})
        this.props.setMessage(`Mielipide ${newKeskustelu.title} on lisätty Foorumille.`, messageTypes.INFO)
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

  /// render
  render () {
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
                <Button onClick={this.handleSave} primary>Tallenna</Button>
                <Button onClick={this.handleRestore} secondary>Peruuta</Button>
              </Form>
            </Segment> :
            <Button onClick={this.handleAdd} primary>Lisää</Button>
          : ''
        }
      </>
    )
  }
}

export default Keskustelu
