/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Users -komponentti sisältää Käyttäjien hallinnan
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Segment, Grid, Menu, Form, Button} from 'semantic-ui-react'
import {Logger} from 'react-logger-lib'
import usersData from '../services/users'

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

const User = (props) => {
    return (
      <Form>
        <Form.Input label='Tunnus' name='tunnus' type='input' value={props.user.tunnus}/>
        <Form.Input label='Nimi' name='nimi' type='input' value={props.user.nimi} />
        <Form.Input label='Sähköposti' name='email' type='input' value={props.user.email} />
        <Button primary>Päivitä</Button>
      </Form>
    )
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

  componentDidMount() {
    usersData.getAll()
      .then(responseData => {
        Logger.of('Users.componentDidMount').info('responseData', responseData)
        // this.setState({aiheet: responseData}) UNCOMMENT WHEN USER API IS READY
      })
  }

  handleUserClick = (e, {name}) => this.setState({currentUser:name})

  render () {
    const userRivit = this.state.users.map(user => {
      Logger.of('Users.render').info('user', user)
      return (<UserRivi key={user.id}
                              id={user.id}
                              nimi={user.nimi}
                              tunnus={user.tunnus}
                              email={user.email}
                              activeUser={this.state.currentUser}
                              handleUser={this.handleUserClick}/>)
    })

    function userData(currentUser, users) {
      const user = users[users.findIndex(user => user.id===currentUser)]
      return user;
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
