/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// UserLomake -komponentti sisältää Käyttäjien syöttö -lomakkeen
/// Paul Kallio 1.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Segment, Form, Button, Divider} from 'semantic-ui-react'
import {messageTypes, messageTime} from '../tools/Huomio'
import usersData from '../services/users'
const logger = require('simple-console-logger').getLogger('UserLomake')

class UserLomake extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tunnus:     this.state ? this.state.tunnus : '',
      nimi:       this.state ? this.state.name : '',
      eposti:     this.state ? this.state.eposti : '',
      salasana:   this.state ? this.state.salasana : '',
      lisaaTila:  this.state ? this.state.lisaaTila : false
    }
  }

  handleAdd = (event, {name}) => {
    event.preventDefault()
    this.setState({lisaaTila: true})
  }

  handleRestore = (event, {name}) => {
    event.preventDefault()
    this.setState({tunnus: '', nimi: '', eposti: '', salasana: '', lisaaTila: false})
  }

  handleSave = (event, {name}) => {
    event.preventDefault()
    const newUser = {
        username: this.state.tunnus,
        password: this.state.salasana,
        name:     this.state.nimi
    }

    usersData.create(newUser)
      .then(responseData => {
        logger.info('usersData.create:', responseData)
        this.setState({tunnus: '', nimi: '', eposti: '', salasana: '', lisaaTila: false})
        this.props.setMessage(`Käyttäjä ${newUser.username} on lisätty Foorumille.`, messageTypes.INFO)
        this.props.refresh()
      })
      .catch(error => {
        logger.info('usersData.create:', error)
        this.props.setMessage(error.message, messageTypes.WARNING)
      })
      .finally(() => {
        setTimeout(() => {
          this.props.setMessage('', messageTypes.CLOSE)
        }, messageTime.NORMAL)
    })
  }

  render() {
      return (
        this.state.lisaaTila  ?
          <Segment>
            <Form>
              <Form.Input label='Tunnus' name='tunnus' type='input'
                           onChange={(e) => this.setState({tunnus: e.target.value})} value={this.state.tunnus} />
              <Form.Input label='Nimi' name='nimi' type='input'
                           onChange={(e) => this.setState({nimi: e.target.value})} value={this.state.nimi} />
              <Form.Input label='E-mail' name='eposti' type='input'
                           onChange={(e) => this.setState({eposti: e.target.value})} value={this.state.eposti} />
              <Form.Input label='Salasana' name='salasana' type='password'
                           onChange={(e) => this.setState({salasana: e.target.value})} value={this.state.salasana} />
              <Divider horizontal hidden />
              <Button onClick={this.handleSave} primary>Tallenna</Button>
              <Button onClick={this.handleRestore} secondary>Peruuta</Button>
            </Form>
          </Segment>
          :
          <Button onClick={this.handleAdd} primary>Lisää</Button>
          : ''
        )
    }
}

export default UserLomake
