/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Users -komponentti sisältää Käyttäjien hallinnan
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Segment, Grid, Menu, Form, Button} from 'semantic-ui-react'
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
          logger.error('componentDidMount.usersData.error:', error.message)
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
      users: [{id:"1",tunnus:"tuiti",nimi:"Tuula Pitkänen",email:"tp@.hukka.org"},
              {id:"2",tunnus:"jupe",nimi:"Jukka Metso",email:"jm@.hukka.org"},
              {id:"3",tunnus:"sepe",nimi:"Seppo Kiurula",email:"sk@.hukka.org"}],
      currentUser: "1",
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
