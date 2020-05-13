/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// KeskusteluLomake -komponentti sisältää Käyttäjien syöttö -lomakkeen
/// Paul Kallio 13.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Segment, Form, Button, Divider, TextArea} from 'semantic-ui-react'
import {messageTypes, messageTime} from '../common/Huomio'
import keskusteluData from '../../services/keskustelu'
const logger = require('simple-console-logger').getLogger('KeskusteluLomake')

/// KeskusteluLomake
class KeskusteluLomake extends Component {

  /// constructor
  constructor(props) {
    super(props)
    this.state = {
      otsikko: this.props.keskustelu.title,
      teksti: this.props.keskustelu.text
    }
  }

  /// handleRestore
  handleRestore = (event, {name}) => {
    event.preventDefault()
    this.setState({otsikko: '', teksti: ''})
    this.props.restore()
  }

  /// handleSave
  handleSave = (event, {name}) => {
    event.preventDefault()
    logger.info('handleSave.keskustelu', this.props.keskustelu)
    logger.info('handleSave.keskustelu', this.state.otsikko, this.state.teksti)

    const newKeskustelu = {
        ...this.props.keskustelu,
        title:  this.state.otsikko,
        text:   this.state.teksti
    }
    logger.info('handleSave.newKeskustelu', newKeskustelu)

    keskusteluData.update(this.props.keskustelu.topic, this.props.keskustelu._id, newKeskustelu)
      .then(responseData => {
        logger.info('keskusteluData.update:', responseData)
        this.setState({otsikko: '', teksti: ''})
        this.props.setMessage(`Keskustelu ${newKeskustelu.title} on päivitetty Foorumille.`, messageTypes.INFO)
        this.props.doEdit()
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
          <Segment>
              <Form>
                <Form.Input label='Otsikko' name='otsikko' type='input'
                             onChange={(e) => this.setState({otsikko: e.target.value})} value={this.state.otsikko} />
                <div className='field'>
                  <label>Kommentti</label>
                  <TextArea name='Teksti'
                             onChange={(e) => this.setState({teksti: e.target.value})} value={this.state.teksti} />
                </div>
                <Divider horizontal hidden />
                <Button onClick={this.handleSave} primary>Tallenna</Button>
                <Button onClick={this.handleRestore} secondary>Peruuta</Button>
              </Form>
          </Segment>
        )
  }
}

export default KeskusteluLomake
