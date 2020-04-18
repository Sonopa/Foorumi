/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Users -komponentti sisältää Käyttäjien hallinnan
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Segment} from 'semantic-ui-react'
import {Logger} from 'react-logger-lib'
import usersData from '../services/users'

const KeskusteluRivi = (props) => {
  return (
    <Segment>
      {props.tunnus} {props.nimi} {props.email}
    </Segment>
  )
}

class Users extends Component {

  constructor(props) {
    super(props)
    this.state = {
      users: [{id:"1",tunnus:"tuiti",nimi:"Tuula Pitkänen",email:"tp@.hukka.org"},
              {id:"2",tunnus:"jupe",nimi:"Jukka Metso",email:"jm@.hukka.org"},
              {id:"3",tunnus:"sepe",nimi:"Seppo Kiurula",email:"sk@.hukka.org"}
    ]}
  }

  componentDidMount() {
    usersData.getAll()
      .then(responseData => {
        Logger.of('Users.componentDidMount').warn('responseData', responseData)
        // this.setState({aiheet: responseData}) UNCOMMENT WHEN USER API IS READY
      })
  }

  render () {

    const userRivit = this.state.users.map(user => {
      Logger.of('Users.render').warn('user', user)
      return (<KeskusteluRivi key={user.id}
                              nimi={user.nimi}
                              tunnus={user.tunnus}
                              email={user.email} />)
    })

    return (
      <>
        <Segment raised>
          <h1>Käyttäjien hallinnointi</h1>
        </Segment>
        {userRivit}
      </>
    )
  }
}

export default Users
