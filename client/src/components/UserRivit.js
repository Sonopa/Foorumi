/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// UserRivit -komponentti, Käyttäjien lista
/// Paul Kallio 4.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React from 'react'
import {Segment, Menu, Label, Container} from 'semantic-ui-react'
const logger = require('simple-console-logger').getLogger('UserRivit')

const UserRivit = (props) => {
    if(props.users.length > 0) {
      logger.info('activeUser', props.activeUser)
      const userRivit = props.users.map(user => {
        logger.info('activeUser.map', props.activeUser)
        return (<UserRivi key={user.id}
                          id={user.id}
                          nimi={user.name}
                          tunnus={user.username}
                          email={user.email}
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

const NoUsers = (props) => {
  return <Container>
          <Segment>
            <Label as='a' basic>Ei käyttäjiä</Label>
          </Segment>
        </Container>
}

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
export default UserRivit
