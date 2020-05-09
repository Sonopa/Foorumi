/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// User -komponentti, Käyttäjän tiedot
/// Paul Kallio 3.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Form, Button} from 'semantic-ui-react'
import {messageTypes, messageTime} from '../common/Huomio'
import {isLoggedIn, checkAuth} from '../../tools/session'
import usersData from '../../services/users'
const logger = require('simple-console-logger').getLogger('User')

class User extends Component {

    isLive = true

    constructor(props) {
      super(props)
      this.state = {
        _id: '',
        username: '',
        name: '',
        email: ''
      }
    }

    componentWillUnmount() {
      this.isLive = false
    }

    componentDidUpdate(prevProps, prevState) {
      if(this.isLive) {
          logger.info('componentDidUpdate.this.props', this.props, prevProps.user)
          if(this.props.user !== prevProps.user) {
            if(this.props.user) {
              logger.info('usersData.getUser.props', this.props.user)
              usersData.getUser(this.props.user)
                .then(responseData => {
                  logger.info('componentDidMount.usersData.then:', responseData)
                  this.setState({_id: responseData._id, username: responseData.username, name: responseData.name})
                })
                .catch(error => {
                  logger.error('handleSave.catch:', error)
                  this.props.setMessage(error.message, messageTypes.ERROR)
                })
                .finally(() => {
                  setTimeout(() => {
                    this.props.setMessage('', messageTypes.CLOSE)
                }, messageTime.NORMAL)
              })
            }
          }
      }
    }

    componentDidMount() {
      if(this.props.user) {
        usersData.getUser(this.props.user)
          .then(responseData => {
            logger.info('componentDidMount.usersData.then:', responseData)
            this.setState({user: responseData})
          })
          .catch(error => {
            logger.error('handleSave.catch:', error)
            this.props.setMessage(error.message, messageTypes.ERROR)
          })
          .finally(() => {
            setTimeout(() => {
              this.props.setMessage('', messageTypes.CLOSE)
          }, messageTime.EXTRA)
        })
      }
    }

    deleteUser = (e, {name}) => {


    }

    render() {
      logger.info('render.state', this.state)
      const updateUser = (e, {name}) => {
        const newUser = {
          _id: this.state._id ,
          username: this.state.username ,
          name: this.state.name ,
          email: this.state.email
        }
        logger.info('updateUser', newUser)
        usersData.update(newUser._id, newUser)
          .then(responseData => {
            logger.info('updateUser.response', responseData)
            this.props.setMessage(`Käyttäjän ${newUser.username} tiedot on päivitetty Foorumille.`, messageTypes.INFO)
          })
          .catch(error => {
            logger.info('handleSave.catch:', error)
            const virhe = checkAuth(error) ? "Sessiosi on vanhentunut. Ole hyvä ja kirjaudu uudelleen." : error.message
            this.props.setMessage(virhe, messageTypes.WARNING)
          })
          .finally(() => {
            setTimeout(() => {
              this.props.setMessage('', messageTypes.CLOSE)
          }, messageTime.NORMAL)
        })
      }

      const isUser = (typeof this.props.user) !== 'undefined'
      return (
         isUser ?
            <Form>
              <Form.Input label='Tunnus' name='tunnus' type='input' value={this.state.username}/>
              <Form.Input label='Nimi' name='nimi' type='input' onChange={(e) => this.setState({name: e.target.value})} value={this.state.name} />
              <Form.Input label='Sähköposti' name='email' type='input' onChange={(e) => this.setState({email: e.target.value})} value={this.state.email} />
              {isLoggedIn() ?
                <>
                  <Button onClick={updateUser} primary>Päivitä</Button>
                  <Button onClick={this.deleteUser} primary>Poista</Button>
                </>
              : ''}
            </Form>
            : ''
        )
    }
}
export default User
