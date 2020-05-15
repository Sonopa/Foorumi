/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// User -komponentti, Käyttäjän tiedot
/// Paul Kallio 3.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Form, Button, Segment, Message} from 'semantic-ui-react'
import {messageTypes, messageTime} from '../common/Huomio'
import {isLoggedIn, isUserOwner, checkAuth} from '../../services/local/session'
import usersData from '../../services/users'
import {Tila} from '../common/valikko'
const logger = require('simple-console-logger').getLogger('User')

///
class User extends Component {

  isLive = true

  constructor(props) {
    super(props)
    this.state = {
      _id: '',
      username: '',
      password: '',
      email: '',
      role: '',
      name: '',
      tila: Tila.SELAUS
    }
  }

  ///
  componentWillUnmount() {
    this.isLive = false
  }

  ///
  componentDidUpdate(prevProps, prevState) {
    if(this.isLive) {
        logger.info('componentDidUpdate.this.props', this.props, prevProps.user)
        if(this.props.user !== prevProps.user) {
          if(this.props.user) {
            logger.info('usersData.getUser.props', this.props.user)
            usersData.getUser(this.props.user)
              .then(responseData => {
                logger.info('componentDidMount.usersData.then:', responseData)
                this.setState({_id: responseData._id, username: responseData.username, name: responseData.name,
                                email: responseData.email ? responseData.email : '',
                                role: responseData.role ? responseData.role : 'user'})
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

  ///
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

  /// setTila
  setTila(tila) {
    if(this.isLive) {
      this.setState({tila: tila})
    }
  }

  /// clearForm
  clearForm() {
    if(this.isLive) {
      this.setState({password: ''})
    }
  }

  /// willAdd
  willUpdate = (event, {name}) => {
    event.preventDefault()
    this.setTila(Tila.LISAYS)
  }

  /// willDelete
  willDelete = (event, {name}) => {
    event.preventDefault()
    this.setTila(Tila.POISTO)
  }

  /// restore
  restore = (event, {name}) => {
    event.preventDefault()
    this.clearForm()
    this.setTila(Tila.SELAUS)
  }

  ///
  deleteUser = (event, {name}) => {
    event.preventDefault()
    logger.info('deleteUser', this.state._id)
    const newUser = {
//      _id: this.state._id,
      username: this.state.username,
      password: this.state.password
    }
    usersData.remove(this.state._id, newUser)
      .then(responseData => {
        logger.info('deleteUser.response', responseData)
        this.props.setMessage(`Käyttäjän ${this.state.username} tiedot on poistettu Foorumilta.`, messageTypes.INFO)
        this.clearForm()
        this.setTila(Tila.SELAUS)
      })
      .catch(error => {
        logger.info('handleSave.catch:', error)
        const virhe = error.message
        this.props.setMessage(virhe, messageTypes.WARNING)
      })
      .finally(() => {
        setTimeout(() => {
          this.props.setMessage('', messageTypes.CLOSE)
      }, messageTime.NORMAL)
    })
  }

  updateUser = (event, {name}) => {
    event.preventDefault()
    const newUser = {
      _id: this.state._id,
      username: this.state.username,
      name: this.state.name,
      email: this.state.email,
      role: this.state.role,
      password: this.state.password
    }
    logger.info('updateUser', newUser.username)
    usersData.update(newUser._id, newUser)
      .then(responseData => {
        logger.info('updateUser.response', responseData)
        this.props.setMessage(`Käyttäjän ${newUser.username} tiedot on päivitetty Foorumille.`, messageTypes.INFO)
        this.clearForm()
        this.setTila(Tila.SELAUS)
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

  ///
  render() {
    const isUser = (typeof this.props.user) !== 'undefined'
    return (
       isUser ?
          <Form>
            <Form.Input label='Tunnus' name='tunnus' type='input' value={this.state.username}/>
            <Form.Input label='Rooli' name='role' type='input' value={this.state.role}/>
            <Form.Input label='Nimi' name='nimi' type='input' onChange={(e) => this.setState({name: e.target.value})} value={this.state.name} />
            <Form.Input label='Sähköposti' name='email' type='input' onChange={(e) => this.setState({email: e.target.value})} value={this.state.email} />
            {isLoggedIn() && isUserOwner(this.state.username) ?
              <>
                {Tila.SELAUS === this.state.tila ?
                  <>
                    <Button onClick={this.willUpdate} primary>Päivitä</Button>
                    <Button onClick={this.willDelete} primary>Poista</Button>
                  </>
                  :
                    <>
                      {Tila.POISTO === this.state.tila ?
                        <>
                          <Message info>
                            <Message.Header>Poista käyttäjän tiedot</Message.Header>
                          </Message>
                          <Segment>
                              <Form.Input label='Salasana' name='password' type='password'
                                           onChange={(e) => this.setState({password: e.target.value})} value={this.state.password} />
                              <Button onClick={this.deleteUser} primary>Poista</Button>
                              <Button onClick={this.restore} primary>Peruuta</Button>
                          </Segment>
                        </> :
                        <>
                          <Message info>
                            <Message.Header>Päivitä käyttäjän tiedot</Message.Header>
                          </Message>
                          <Segment>
                              <Form.Input label='Salasana' name='password' type='password'
                                           onChange={(e) => this.setState({password: e.target.value})} value={this.state.password} />
                              <Button onClick={this.updateUser} primary>Tallenna</Button>
                              <Button onClick={this.restore} primary>Peruuta</Button>
                          </Segment>
                        </>
                      }
                    </>
                }
              </>
            : ''}
          </Form>
          : ''
      )
  }
}
export default User
