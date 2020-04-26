/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Login -komponentti
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, { Component } from 'react'
import {Segment, Form, Button, Container} from 'semantic-ui-react'
import usersData from '../services/users'

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
          logger.info('LoginForm.render.handleSave.responseData', responseData)
          this.setState({username: '', password: ''})
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

  render () {

    const handleSave = event => {
      event.preventDefault()

      const logoutUser = {
          username: 'testi'
      }

      usersData.logout(logoutUser)
        .then(responseData => {
          logger.info('LogoutForm.render.handleSave.responseData', responseData)
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

  render() {
    return (
      <Container>
        <Segment compact raised>
          <h1>Anna käyttäjätiedot</h1>
          <LoginForm />
        </Segment>
      </Container>
    )
  }
}

export class Logout extends Component {

  render() {
    return (
      <Container>
        <Segment compact raised>
          <h1>Kirjaudu Ulos</h1>
          <LogoutForm />
        </Segment>
      </Container>
    )
  }
}
