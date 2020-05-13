/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// usersAction -komponentti
/// Paul Kallio 7.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import usersData from '../../services/users'
import {getUser} from '../../services/local/session'
import {userAction} from './userAction'
const logger = require('simple-console-logger').getLogger('usersAction')

/// usersAction
export const usersAction = {
  LOAD:   'loadUsers',
  ADD:    'addUsers',
  DELETE: 'deleteUsers',
  UPDATE: 'updateUsers'
}

/// loadUsersMWare
export function loadUsersMWare() {
  return async (dispatch) => {
    const users = await usersData.getAll()
    logger.info('loadUsersMWare.users', users)
    const username = getUser()
    let user = {_id:0}
    if(username) {
      const index = users.findIndex(item => item.username === username)
      user = (index > -1) ? users.slice(index, index + 1)[0] : {_id:0}
      logger.info('setActiveUserMWare.users', username, user)
    }

    dispatch({
      type: usersAction.LOAD,
      data: users
    })

    dispatch({
      type: userAction.CURRENT,
      data: user
    })
  }
}

/// loadUsers
export function loadUsers(users) {
  return {
    type: usersAction.LOAD,
    data: users
  }
}

/// addUsers
export function addUsers(user) {
  return {
    type: usersAction.ADD,
    data: user
  }
}

/// deleteUsers
export function deleteUsers(user) {
  return {
    type: usersAction.DELETE,
    data: user
  }
}

/// updateUsers
export function updateUsers(user) {
  return {
    type: usersAction.UPDATE,
    data: user
  }
}
