/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// userAction -komponentti
/// Paul Kallio 9.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import {getUser} from '../tools/session'
const logger = require('simple-console-logger').getLogger('usersAction')

/// User Action Name
export const userAction = {
  CURRENT: 'currentUser'
}

/// loadUsersMWare
export function setActiveUserMWare() {
  return function(dispatch, getState) {

    const username = getUser()
    const users = getState().users

    const index = users.findIndex(item => item.username === username)
    const user = (index > -1) ? users.slice(index, index + 1)[0] : {_id:0}
    logger.info('setActiveUserMWare.users', username, user)

    dispatch({
      type: userAction.CURRENT,
      data: user
    })
  }
}

/// set Current User Action
export const setCurrentUser = user => {
  return {
    type: userAction.CURRENT,
    data: user
  }
}
