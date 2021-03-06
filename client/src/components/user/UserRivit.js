/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// UserRivit -komponentti, Käyttäjien lista
/// Paul Kallio 4.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Segment, Menu, Label, Container} from 'semantic-ui-react'
const logger = require('simple-console-logger').getLogger('UserRivit')

/// UserRivit
const UserRivit = (props) => {
    if(props.users.length > 0) {
      logger.info('users', props)
      const userRivit = props.users.map(user => {
        return (<UserRivi key={user._id}
                          id={user._id}
                          nimi={user.name}
                          tunnus={user.username}
                          // email={user.email}
                          activeUser={props.activeUser}
                          handleUser={props.handleUser}/>)
      })
      return (
        <Menu vertical fluid>
          {userRivit}
        </Menu>
      )
    }
    return <NoUsers />
}

/// UserRivi
const NoUsers = (props) => {
  return <Container>
          <Segment>
            <Label as='a' basic>Ei käyttäjiä</Label>
          </Segment>
        </Container>
}

/// UserRivi
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
/// Valikko -komponentti - Redux Tilankäsittely
const mapStateToProps = state => {
  return {
    username: state.username
  }
}
export default withRouter(connect(mapStateToProps, null)(UserRivit))
