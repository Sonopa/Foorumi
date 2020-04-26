/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Login -komponentti
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, { Component } from 'react'
import {Segment, Form, Button, Container} from 'semantic-ui-react'
import usersData from '../services/users'
import Huomio, {messageTypes, messageTime} from './Huomio'
import {getUser} from '../services/session'

const logger = require('simple-console-logger').getLogger('Login')

class LoginForm extends Component {

  constructor(props) {
      super(props)
      this.state = {
        username: '',
        password: ''
      }
  }

  render () {
    const handleName = event => {
      this.setState({username: event.target.value})
    }

    const handlePass = event => {
      this.setState({password: event.target.value})
    }

    const handleSave = event => {
      event.preventDefault()

      const newLogin = {
          username: this.state.username,
          password: this.state.password
      }
      logger.info('LoginForm.render.handleSave.newLogin', newLogin)

      usersData.login(newLogin)
        .then(responseData => {
          logger.info('LoginForm.render.login.responseData', responseData)
          this.props.setMessage(`Käyttäjä ${this.state.username} kirjautui Foorumiin.`, messageTypes.INFO)
          this.setState({username: '', password: ''})
        })
        .catch(exception => {
          logger.info('LogoutForm.catch:', exception)
          this.props.setMessage(exception.message, messageTypes.WARNING)
        })
        .finally(() => {
          setTimeout(() => {
            this.props.setMessage('', messageTypes.CLOSE)
          }, messageTime.NORMAL)
      })
    }

    return (
      <Form>
        <Form.Input label='Tunnus' id='username' name='username' type='input' value={this.state.username} onChange={handleName}/>
        <Form.Input label='Salasana' id='password' name='password' type='password' value={this.state.password} onChange={handlePass} />
        <Button onClick={handleSave} primary>Kirjaudu</Button>
      </Form>
    )
  }
}

class LogoutForm extends Component {

  constructor(props) {
    super(props)
  }

  render () {

    const handleSave = event => {
      event.preventDefault()

      const logoutUser = {
          username: getUser()
      }

      usersData.logout(logoutUser)
        .then(responseData => {
          logger.info('LogoutForm.then.responseData', responseData)
          this.props.setMessage(`Käyttäjä ${logoutUser.username} poistui Foorumista.`, messageTypes.INFO)
        })
        .catch(exception => {
          logger.info('LogoutForm.catch:', exception)
          this.props.setMessage(exception.message, messageTypes.WARNING)
        })
        .finally(() => {
          setTimeout(() => {
            this.props.setMessage('', messageTypes.CLOSE)
          }, messageTime.NORMAL)
      })
    }

    return (
      <Form>
        <Button onClick={handleSave} primary>Kirjaudu Ulos</Button>
      </Form>
    )
  }
}

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messu: '',
      messuTyyppi: messageTypes.CLOSE
    }
  }

  render() {
    const setMessage = (messu, tyyppi) => {
      this.setState({messu: messu, messuTyyppi: tyyppi})
    }

    return (
      <>
        <Huomio teksti={this.state.messu} tyyppi={this.state.messuTyyppi} />
        <Container>
          <Segment compact raised>
            <h1>Anna käyttäjätiedot</h1>
            <LoginForm setMessage={setMessage} />
          </Segment>
        </Container>
      </>
    )
  }
}

export class Logout extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messu: '',
      messuTyyppi: messageTypes.CLOSE
    }
  }

  render() {
    const setMessage = (messu, tyyppi) => {
      this.setState({messu: messu, messuTyyppi: tyyppi})
    }

    return (
      <>
      <Huomio teksti={this.state.messu} tyyppi={this.state.messuTyyppi} />
        <Container>
          <Segment compact raised>
            <h1>Kirjaudu Ulos</h1>
            <LogoutForm setMessage={setMessage} />
          </Segment>
        </Container>
      </>
    )
  }
}
