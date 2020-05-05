/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Users -komponentti sisältää Käyttäjien hallinnan
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Segment, Grid} from 'semantic-ui-react'
import UserRivit from './UserRivit'
import User from './User'
import UserLomake from '../forms/UserLomake'
import Huomio, {messageTypes, messageTime} from '../tools/Huomio'
import {isLoggedIn, getUser} from '../tools/session'
import usersData from '../services/users'

const logger = require('simple-console-logger').getLogger('Users')

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
    this.refresh()
  }

  refresh = () => {
    usersData.getAll()
      .then(responseData => {
          logger.info('Users.componentDidMount.responseData:', responseData)
          const currentUser = (responseData && responseData.length > 0) ? responseData[0].id : ''
          if(this.isLive) {
            this.setState({users: responseData, currentUser: currentUser})
          }
      })
      .catch(exception => {
        logger.info('handleSave.catch:', exception)
        this.setMessage(exception.message, messageTypes.ERROR)
      })
      .finally(() => {
        setTimeout(() => {
          this.setMessage('', messageTypes.CLOSE)
      }, messageTime.EXTRA)
    })
  }

  handleUserClick = (event, {name}) =>  {
      event.preventDefault()
      logger.info('Users.handleUserClick.currentUser:', parseInt(name))
      this.setState({currentUser: parseInt(name)})
  }

  setMessage = (messu, tyyppi) => {
    if(this.isLive) {
      logger.trace('setMessage:', messu, tyyppi)
      this.setState({messu: messu, messuTyyppi: tyyppi})
    }
  }

  render () {

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
              <UserRivit  users={this.state.users}
                          activeUser={this.state.currentUser}
                          handleUser={this.handleUserClick} />
              <UserLomake setMessage={this.setMessage} refresh={this.refresh} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={12} stretched>
            <Segment>
              <User user={this.state.currentUser}  setMessage={this.setMessage} />
            </Segment>
          </Grid.Column>
        </Grid>
      </>
    )
  }
}

export default Users
