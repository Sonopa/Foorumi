/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// KeskusteluLisaLomake -komponentti sisältää Käyttäjien syöttö -lomakkeen
/// Paul Kallio 13.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Segment, Form, Button, Divider, TextArea, Message} from 'semantic-ui-react'
import {messageTypes, messageTime} from '../common/Huomio'
import kommenttiData from '../../services/kommentti'
const logger = require('simple-console-logger').getLogger('KeskusteluLisaLomake')

/// KeskusteluLomake
class KeskusteluLisaLomake extends Component {

  /// constructor
  constructor(props) {
    super(props)
    this.state = {
      kommentti: ''
    }
  }

  /// handleRestore
  handleRestore = (event, {name}) => {
    event.preventDefault()
    logger.info('handleSave.handleRestore', this.props.keskustelu)
    this.setState({kommentti: ''})
    this.props.restore()
  }

  /// handleSave
  handleSave = (event, {name}) => {
    event.preventDefault()
    logger.info('handleSave.keskustelu', this.props.keskustelu)
    logger.info('handleSave.keskustelu', this.state.otsikko, this.state.teksti)

    const newKommentti = {
        ...this.props.keskustelu,
        kommentti: [...this.props.keskustelu.comments, this.state.kommentti]
    }

    logger.info('handleSave.newKeskustelu', newKommentti)
    kommenttiData.create(this.props.keskustelu.topic, this.props.keskustelu._id, newKommentti)
      .then(responseData => {
        logger.info('kommenttiData.update:', responseData)
        this.setState({kommentti: ''})
        this.props.setMessage(`Keskustelulle ${newKommentti.title} on lisätty kommentti.`, messageTypes.INFO)
        this.props.doAdd()
      })
      .catch(error => {
        logger.info('keskusteluData.update:', error)
        this.props.setMessage(error.message, messageTypes.WARNING)
      })
      .finally(() => {
        setTimeout(() => {
          this.props.setMessage('', messageTypes.CLOSE)
        }, messageTime.NORMAL)
    })
  }

  /// render
  render() {
      return (
          <>
            <Message info>
              <Message.Header>Lisää kommentti</Message.Header>
            </Message>
            <Segment>
              <Form>
                <div className='field'>
                  <label>Kommentti</label>
                  <TextArea name='kommentti'
                             onChange={(e) => this.setState({kommentti: e.target.value})} value={this.state.kommentti} />
                </div>
                <Divider horizontal hidden />
                <Button onClick={this.handleSave} primary>Lisää</Button>
                <Button onClick={this.handleRestore} secondary>Peruuta</Button>
              </Form>
            </Segment>
          </>
        )
  }
}

export default KeskusteluLisaLomake
