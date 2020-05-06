/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Valikko -komponentti
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Menu} from 'semantic-ui-react'
import {Link, withRouter} from 'react-router-dom'
const logger = require('simple-console-logger').getLogger('Valikko')

const ETUSIVU =  'etusivu'
const FOORUMI =  'foorumi'
const VAALI   =  'vaali'
const USERS   =  'users'
const LOGIN   =  'login'
const LOGOUT  =  'logout'

/// Valikko -komponentti
class Valikko extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  handleItemClick = (event, {name}) => {
    this.setState({activeItem: name})
  }

  render () {

    const {activeItem} = this.state
    logger.info('render.username', this.props.username)
    return (
      <Menu>
        <Menu.Item as={Link} to='/' name={ETUSIVU} active={activeItem===ETUSIVU} onClick={this.handleItemClick}>Etusivu</Menu.Item>
        <Menu.Item as={Link} to='foorumi' name={FOORUMI} active={activeItem===FOORUMI} onClick={this.handleItemClick}>Foorumi</Menu.Item>
        <Menu.Item as={Link} to='vaali' name={VAALI} active={activeItem===VAALI} onClick={this.handleItemClick}>Äänestys</Menu.Item>
        <Menu.Item as={Link} to='users' name={USERS} active={activeItem===USERS} onClick={this.handleItemClick}>Käyttäjät</Menu.Item>
        {this.props.username
          ? <Menu.Item as={Link} to='logout' position="right" name={LOGOUT} active={activeItem===LOGOUT} onClick={this.handleItemClick}>Uloskirjaus</Menu.Item>
          : <Menu.Item as={Link} to='login' position="right" name={LOGIN} active={activeItem===LOGIN} onClick={this.handleItemClick}>Sisäänkirjaus</Menu.Item>
        }
      </Menu>
    )
  }
}

/// Valikko -komponentti - Redux Tilankäsittely
const mapStateToProps = state => {
    logger.info('mapStateToProps.state', state)
  return {
    username: state.username
  }
}
export default withRouter(connect(mapStateToProps, null)(Valikko))
