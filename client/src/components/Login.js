/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Login -komponentti
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, { Component } from 'react'
import {Segment, Container} from 'semantic-ui-react'
import LoginForm from '../forms/LoginForm'
import LogoutForm from '../forms/LogoutForm'
import Huomio, {messageTypes} from '../tools/Huomio'

const logger = require('simple-console-logger').getLogger('Login')

export default class Login extends Component {

  isLive = true

  constructor(props) {
    super(props)
    this.state = {
      messu: '',
      messuTyyppi: messageTypes.CLOSE
    }
  }

  componentWillUnmount() {
    this.isLive = false
  }

  render() {
    const setMessage = (messu, tyyppi) => {
      if(this.isLive) {
        logger.trace('setMessage:', messu, tyyppi)
        this.setState({messu: messu, messuTyyppi: tyyppi})
      }
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

  isLive = true

  constructor(props) {
    super(props)
    this.state = {
      messu: '',
      messuTyyppi: messageTypes.CLOSE
    }
  }

  componentWillUnmount() {
    this.isLive = false
  }

  setMessage = (messu, messuTyyppi) => {
    if(this.isLive) {
      logger.trace('setMessage', messu, messuTyyppi)
      this.setState({messu: messu, messuTyyppi: messuTyyppi})
    }
  }

  render() {
    return (
      <>
      <Huomio teksti={this.state.messu} tyyppi={this.state.messuTyyppi} />
        <Container>
          <Segment compact raised>
            <h1>Kirjaudu Ulos</h1>
            <LogoutForm setMessage={this.setMessage} />
          </Segment>
        </Container>
      </>
    )
  }
}
