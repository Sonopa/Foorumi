  /// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Users -komponentti sisältää Käyttäjien hallinnan
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Segment, Grid, Menu, Form, Button, Divider} from 'semantic-ui-react'
import usersData from '../services/users'
import {getLoggedIn, isLoggedIn} from '../services/session'
import Huomio, {messageTypes, messageTime} from './Huomio'

const logger = require('simple-console-logger').getLogger('Users')

const UserRivi = (props) => {
  return (
    <Menu.Item
      name={props.id}
      active={props.activeUser===props.id}
      onClick={props.handleUser}
      >
      {props.tunnus}
    </Menu.Item>
  )
}

class UserLomake extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tunnus:     this.state ? this.state.tunnus : '',
      nimi:       this.state ? this.state.name : '',
      eposti:     this.state ? this.state.eposti : '',
      salasana:   this.state ? this.state.salasana : '',
      lisaaTila:  this.state ? this.state.lisaaTila : false
    }
  }

  handleAdd = (e, {name}) => this.setState({lisaaTila: true})
  handleRestore = (e, {name}) =>
      this.setState({tunnus: '', nimi: '', eposti: '', salasana: '', lisaaTila: false})

  handleSave = (e, {name}) => {
    const newUser = {
        username: this.state.tunnus,
        password: this.state.salasana,
        name:     this.state.nimi
    }

    usersData.create(newUser)
      .then(responseData => {
        logger.info('handleSave.responseData:', responseData)
        this.setState({tunnus: '', nimi: '', eposti: '', salasana: '', lisaaTila: false})
        this.props.setMessage(`Käyttäjä ${newUser.tunnus} on lisätty Foorumille.`, messageTypes.INFO)
      })
      .catch(exception => {
        logger.info('handleSave.responseData:', exception)
        this.props.setMessage(exception.message, messageTypes.WARNING)
      })
      .finally(() => {
        setTimeout(() => {
          this.props.setMessage('', messageTypes.CLOSE)
        }, messageTime.NORMAL)
    })
  }

  render() {
      return (
        // isLoggedIn() ?
        this.state.lisaaTila  ?
          <Segment>
            <Form>
              <Form.Input label='Tunnus' name='tunnus' type='input'
                           onChange={(e) => this.setState({tunnus: e.target.value})} value={this.state.tunnus} />
              <Form.Input label='Nimi' name='nimi' type='input'
                           onChange={(e) => this.setState({nimi: e.target.value})} value={this.state.nimi} />
              <Form.Input label='E-mail' name='eposti' type='input'
                           onChange={(e) => this.setState({eposti: e.target.value})} value={this.state.eposti} />
              <Form.Input label='Salasana' name='salasana' type='password'
                           onChange={(e) => this.setState({salasana: e.target.value})} value={this.state.salasana} />
              <Divider horizontal hidden />
              <Button onClick={this.handleSave} primary>Tallenna</Button>
              <Button onClick={this.handleRestore} secondary>Peruuta</Button>
            </Form>
          </Segment>
          :
          <Button onClick={this.handleAdd} primary>Lisää</Button>
          : ''
        )
    }
}

class User extends Component {

    constructor(props) {
      super(props)
      this.state = {
        id: '', // props.user.id,
        tunnus: '', // props.user.username,
        nimi: '', // props.user.name,
        email: '' // props.user.email,
        // oldId: ''
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if(this.props.user && this.state.user && (this.state.user.id !== this.props.user.id)) {
        this.setState({
          id: this.props.user.id,
          tunnus: this.props.user.username,
          nimi: this.props.user.name,
          email: this.props.user.email
        })
      }
    }

    componentDidMount() {
      usersData.getAll()
        .then(responseData => {
          logger.info('componentDidMount.usersData.then:', responseData)
          this.setState({aiheet: responseData})
        })
        .catch(exception => {
          logger.info('handleSave.catch:', exception)
          this.props.setMessage(exception.message, messageTypes.ERROR)
        })
        .finally(() => {
          setTimeout(() => {
            this.props.setMessage('', messageTypes.CLOSE)
        }, messageTime.EXTRA)
      })
    }

    render() {
      const isUser = (typeof this.props.user) !== 'undefined'
      if(isUser) {
          logger.info('User.render.user:', this.props.user)
          logger.info('getLoggedIn', getLoggedIn())
          logger.info('isLoggedIn()', isLoggedIn())
          logger.info('isLoggedIn', isLoggedIn)
      }
      return (
         isUser ?
            <Form>
              <Form.Input label='Tunnus' name='tunnus' type='input' value={this.props.user.username}/>
              <Form.Input label='Nimi' name='nimi' type='input' onChange={(e) => this.setState({nimi: e.target.value})} value={this.props.user.name} />
              <Form.Input label='Sähköposti' name='email' type='input' onChange={(e) => this.setState({email: e.target.value})} value={this.props.user.email} />
              {isLoggedIn() ?
              <Button primary>Päivitä</Button>
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
      currentUser: '',
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
        logger.info('Users.componentDidMount.responseData:', responseData)
        const currentUser = (responseData && responseData.length > 0) ? responseData[0].id : ''
        this.setState({users: responseData, currentUser: currentUser /*, aiheVaihtuu: true */})
      })
     return true
  }

  handleUserClick = (e, {name}) => this.setState({currentUser:name})

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

    function userData(currentUser, users) {
      const ix = users.findIndex(user => user.id===currentUser)
      const user = users.slice(ix, ix + 1)
      return user[0]
    }

    const setMessage = (messu, tyyppi) => {
      if(this.isLive) {
        logger.trace('setMessage:', messu, tyyppi)
        this.setState({messu: messu, messuTyyppi: tyyppi})
      }
    }

    return (
      <>
        <Segment raised>
          <h1>Käyttäjien hallinnointi</h1>
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
              <User user={userData(this.state.currentUser, this.state.users)}  setMessage={setMessage} />
            </Segment>
          </Grid.Column>
        </Grid>
      </>
    )
  }
}

export default Users
