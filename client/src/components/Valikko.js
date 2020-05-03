/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Valikko -komponentti
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {isLoggedIn} from '../tools/session'

class Valikko extends Component {

  state = {}
  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  render () {
    const {activeItem} = this.state
    return (
      <Menu>
        <Menu.Item as={Link} to='/' name='etusivu' active={activeItem==='etusivu'} onClick={this.handleItemClick}>Etusivu</Menu.Item>
        <Menu.Item as={Link} to='foorumi' name='foorumi' active={activeItem==='foorumi'} onClick={this.handleItemClick}>Foorumi</Menu.Item>
        <Menu.Item as={Link} to='vaali' name='vaali' active={activeItem==='vaali'} onClick={this.handleItemClick}>Äänestys</Menu.Item>
        <Menu.Item as={Link} to='users' name='users' active={activeItem==='users'} onClick={this.handleItemClick}>Käyttäjät</Menu.Item>
        {isLoggedIn()
          ? <Menu.Item as={Link} to='logout' position="right" name='logout' active={activeItem==='logout'} onClick={this.handleItemClick}>Uloskirjaus</Menu.Item>
          : <Menu.Item as={Link} to='login' position="right" name='login' active={activeItem==='login'} onClick={this.handleItemClick}>Sisäänkirjaus</Menu.Item>
        }
      </Menu>
    )
  }
}

export default Valikko
