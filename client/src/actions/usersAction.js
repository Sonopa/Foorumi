/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// usersAction -komponentti
/// Paul Kallio 7.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import usersData from '../services/users'
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
  return async dispatch => {
    const users = await usersData.getAll()
    logger.info('loadUsersMWare.users', users)

    dispatch({
      type: usersAction.LOAD,
      data: users
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
