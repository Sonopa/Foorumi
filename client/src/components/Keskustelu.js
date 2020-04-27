/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Keskustelu -komponentti sisältää yhden keskustelun tiedot
/// Paul Kallio 21.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Form, TextArea, Button, Segment, Divider} from 'semantic-ui-react'
import keskusteluData from '../services/keskustelu'
import {isLoggedIn} from '../services/session'
import {messageTypes, messageTime} from './Huomio'

const logger = require('simple-console-logger').getLogger('Keskustelu')

class Keskustelu extends Component {

  constructor(props) {
    super(props)
    logger.info('constructor.props:', props)

    this.state = {
      aihe: this.state ? this.state.aihe : this.props.aihe,
      otsikko:  this.state ? this.state.otsikko : '',
      kommentti: this.state ? this.state.kommentti : '',
      omistaja: '1',
      lisaaTila: false,
      messu: '',
      messuTyyppi: messageTypes.CLOSE
    }
  }

  componentDidUpdate() {
    if(this.state.aihe !== this.props.aihe) {
      logger.trace('componentDidUpdate.aihe:', this.state.aihe, this.props.aihe)
      this.setState({aihe: this.props.aihe, otsikko: '', kommentti: '', lisaaTila: false})
      logger.trace('componentDidUpdate.lisaaTila:', false)
    }
  }

  render () {

    const handleAdd = (e, {name}) => this.setState({lisaaTila: true})
    const handleRestore = (e, {name}) =>
        this.setState({otsikko: '', kommentti: '', lisaaTila: false})
    const handleSave = (e, {name}) => {
      const newKeskustelu = {
          owner:  this.state.omistaja,
          title:  this.state.otsikko,
          text:   this.state.kommentti
      }
      keskusteluData.create(this.state.aihe, newKeskustelu)
        .then(responseData => {
          logger.info('handleSave.responseData:', responseData)
          this.setState({lisaaTila: false, otsikko: '', kommentti: ''})
          this.props.setMessage(`Mielipide ${newKeskustelu.otsikko} on lisätty Foorumille.`, messageTypes.INFO)
        })
        .catch(exception => {
          logger.info('handleSave.catch:', exception)
          this.props.setMessage(exception.message, messageTypes.WARNING)
        })
        .finally(() => {
          setTimeout(() => {
            this.props.setMessage('', messageTypes.CLOSE)
          }, messageTime.NORMAL)
      })
    }

    const isState = () => {
      logger.trace('Keskustelu.render.this.state.aihe:', this.state.aihe)
      return this.state.aihe !== ''
    }

    return (
      <>
        {isState() && isLoggedIn() ?
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
