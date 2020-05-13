/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// LoginForm -komponentti
/// Paul Kallio 3.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Form, Button} from 'semantic-ui-react'
import {messageTypes, messageTime} from '../common/Huomio'
import usersData from '../../services/users'
import {FOORUMI} from '../common/valikko'
import {setActiveUserMWare} from '../../stores/actions/userAction'

const logger = require('simple-console-logger').getLogger('LoginForm')

/// Login Form -komponentti
class LoginForm extends Component {

  // render
  constructor(props) {
      super(props)
      this.state = {
        username: '',
        password: ''
      }
  }

  // render
  render () {
    const handleName = event => {
      event.preventDefault()
      this.setState({username: event.target.value})
    }

    const handlePass = event => {
      event.preventDefault()
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
          this.props.setActiveUserMWare()
          this.props.setMessage(`Käyttäjä ${this.state.username} kirjautui Foorumiin.`, messageTypes.INFO)
          this.setState({username: '', password: ''})
          this.props.history.push(FOORUMI)
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

/// Redux storage for Login form
const mapDispatchToProps = {
  setActiveUserMWare
}

export default withRouter(connect(null, mapDispatchToProps)(LoginForm))
