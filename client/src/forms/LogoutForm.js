/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// LogoutForm -komponentti
/// Paul Kallio 3.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Form, Button} from 'semantic-ui-react'
import {setCurrentUser} from '../reducers/userReducer'
import {messageTypes, messageTime} from '../tools/Huomio'
import {getUser} from '../tools/session'
import usersData from '../services/users'
const logger = require('simple-console-logger').getLogger('LogoutForm')

class LogoutForm extends Component {

  render () {

    const handleSave = event => {
      event.preventDefault()

      const logoutUser = {
          username: getUser()
      }

      usersData.logout(logoutUser)
        .then(responseData => {
          logger.info('LogoutForm.then.responseData', responseData)
          this.props.setCurrentUser({username:''})
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

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setCurrentUser
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogoutForm))
