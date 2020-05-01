/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Users -komponentti sisältää Käyttäjien hallinnan
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Segment, Grid, Menu, Form, Button} from 'semantic-ui-react'
import usersData from '../services/users'
import {isLoggedIn, checkAuth, getUser} from '../services/session'
import Huomio, {messageTypes, messageTime} from './Huomio'
import UserLomake from '../forms/UserLomake'

const logger = require('simple-console-logger').getLogger('Users')

const UserRivi = (props) => {
  return (
    <Menu.Item
      name={props.id + ''}
      active={props.activeUser===props.id}
      onClick={props.handleUser}
      >
      {props.tunnus}
    </Menu.Item>
  )
}

class User extends Component {

    isLive = true

    constructor(props) {
      super(props)
      this.state = {
        id: 0,
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
          if(this.props.user !== prevProps.user) {
            if(this.props.user > 0) {
              usersData.getUser(this.props.user)
                .then(responseData => {
                  logger.info('componentDidMount.usersData.then:', responseData)
                  this.setState({id: responseData.id, username: responseData.username, name: responseData.name})
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
      if(this.props.user > 0) {
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
      const updateUser = (e, {name}) => {
        const newUser = {
          id: this.state.id ,
          username: this.state.username ,
          name: this.state.name ,
          email: this.state.email
        }
        logger.info('User.updateUser', newUser)
        usersData.update(newUser.id, newUser)
          .then(responseData => {
            logger.info('User.updateUser.response:', responseData)
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

class Users extends Component {

  isLive = true

  constructor(props) {
    super(props)
    this.state = {
      users: [],
      currentUser: 0,
      messu: '',
      messuTyyppi: messageTypes.CLOSE
    }
  }

  componentWillUnmount() {
    this.isLive = false
  }

  componentDidMount() {
    usersData.getAll()
      .then(responseData => {
        if(this.isLive) {
          logger.info('Users.componentDidMount.responseData:', responseData)
          const currentUser = (responseData && responseData.length > 0) ? responseData[0].id : ''
          this.setState({users: responseData, currentUser: currentUser})
        }
      })
     return true
  }

  handleUserClick = (event, {name}) =>  {
      event.preventDefault()
      logger.info('Users.handleUserClick.currentUser:', parseInt(name))
      this.setState({currentUser: parseInt(name)})
  }


  render () {
    const userRivit = this.state.users.map(user => {
      return (<UserRivi key={user.id}
                              id={user.id}
                              nimi={user.name}
                              tunnus={user.username}
                              email={user.email}
                              activeUser={this.state.currentUser}
                              handleUser={this.handleUserClick}/>)
    })

    const setMessage = (messu, tyyppi) => {
      if(this.isLive) {
        logger.trace('setMessage:', messu, tyyppi)
        this.setState({messu: messu, messuTyyppi: tyyppi})
      }
    }

    return (
      <>
        <Segment raised>
          <Grid>
            <Grid.Column width={15}>
              <h1>Käyttäjien hallinnointi</h1>
            </Grid.Column>
            <Grid.Column width={1}>
              <Segment floated='right'>
                {isLoggedIn() ? getUser() : 'Vierailija'}
              </Segment>
            </Grid.Column>
          </Grid>
        </Segment>
        <Huomio teksti={this.state.messu} tyyppi={this.state.messuTyyppi} />
        <Grid>
          <Grid.Column width={4}>
            <Segment>
              <Menu vertical fluid>
                {userRivit}
              </Menu>
              <UserLomake setMessage={setMessage} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={12} stretched>
            <Segment>
              <User user={this.state.currentUser}  setMessage={setMessage} />
            </Segment>
          </Grid.Column>
        </Grid>
      </>
    )
  }
}

export default Users
