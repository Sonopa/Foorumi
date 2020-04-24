/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Users -komponentti sisältää Käyttäjien hallinnan
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Segment, Grid, Menu, Form, Button, Divider} from 'semantic-ui-react'
import usersData from '../services/users'

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


  render() {
      const handleAdd = (e, {name}) => this.setState({lisaaTila: true})
      const handleRestore = (e, {name}) =>
          this.setState({tunnus: '', nimi: '', eposti: '', salasana: '', lisaaTila: false})
      const handleSave = (e, {name}) => {
        const newUser = {
            username: this.state.tunnus,
            password: this.state.salasana,
            name:     this.state.nimi
        }

        usersData.create(newUser)
          .then(responseData => {
            logger.info('handleSave.responseData:', responseData)
            this.setState({tunnus: '', nimi: '', eposti: '', salasana: '', lisaaTila: false})
          })
        return null;
      }

      return (
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
              <Button onClick={handleSave} primary>Tallenna</Button>
              <Button onClick={handleRestore} secondary>Peruuta</Button>
            </Form>
          </Segment>
          :
          <Button onClick={handleAdd} primary>Lisää</Button>
        )
    }
}

class User extends Component {

    constructor(props) {
      super(props)
      this.state = {
        id: props.user.id,
        tunnus: props.user.tunnus,
        nimi: props.user.nimi,
        email: props.user.email,
        oldId: ''
      }
    }

    componentDidUpdate() {
      if(this.state.oldId !== this.props.user.id) {
        this.setState({
          id: this.props.user.id,
          oldId: this.props.user.id,
          tunnus: this.props.user.tunnus,
          nimi: this.props.user.nimi,
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
        .catch(error => {
          logger.info('componentDidMount.usersData.error:', error.message)
        })
    }

    render() {
      return (
        <Form>
          <Form.Input label='Tunnus' name='tunnus' type='input' value={this.props.user.tunnus}/>
          <Form.Input label='Nimi' name='nimi' type='input' onChange={(e) => this.setState({nimi: e.target.value})} value={this.state.nimi} />
          <Form.Input label='Sähköposti' name='email' type='input' onChange={(e) => this.setState({email: e.target.value})} value={this.state.email} />
          <Button primary>Päivitä</Button>
        </Form>
      )
    }
}

class Users extends Component {

  constructor(props) {
    super(props)
    this.state = {
      users: [{id:"1001",tunnus:"tuiti",nimi:"Tuula Pitkänen",email:"tp@.hukka.org"},
              {id:"1002",tunnus:"jupe",nimi:"Jukka Metso",email:"jm@.hukka.org"},
              {id:"1003",tunnus:"sepe",nimi:"Seppo Kiurula",email:"sk@.hukka.org"}],
      currentUser: "1001",
    }
  }

  handleUserClick = (e, {name}) => this.setState({currentUser:name})

  render () {
    const userRivit = this.state.users.map(user => {
      return (<UserRivi key={user.id}
                              id={user.id}
                              nimi={user.nimi}
                              tunnus={user.tunnus}
                              email={user.email}
                              activeUser={this.state.currentUser}
                              handleUser={this.handleUserClick}/>)
    })

    function userData(currentUser, users) {
      const ix = users.findIndex(user => user.id===currentUser)
      const user = users.slice(ix, ix + 1)
      return user[0]
    }

    return (
      <>
        <Segment raised>
          <h1>Käyttäjien hallinnointi</h1>
        </Segment>
        <Grid>
          <Grid.Column width={4}>
            <Menu vertical fluid>
              {userRivit}
            </Menu>
            <UserLomake />
          </Grid.Column>
          <Grid.Column width={12} stretched>
            <Segment>
              <User user={userData(this.state.currentUser, this.state.users)} />
            </Segment>
          </Grid.Column>
        </Grid>
      </>
    )
  }
}

export default Users
