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
import {setCurrentUser} from '../../stores/actions/userAction'
import {messageTypes, messageTime} from '../common/Huomio'
import {getUser} from '../../services/local/session'
import usersData from '../../services/users'
import {ETUSIVU} from '../common/valikko'
const logger = require('simple-console-logger').getLogger('LogoutForm')

/// Logout Form -komponentti
class LogoutForm extends Component {

  /// render
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
          this.props.history.push(ETUSIVU)
        })
        .catch(exception => {
          logger.info('LogoutForm.catch:', exception)
          this.props.setMessage(exception.message, messageTypes.WARNING)
        })
        .finally(() => {
          this.props.setCurrentUser({_id:0})
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

/// Redux store for Logout Form
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setCurrentUser
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogoutForm))
