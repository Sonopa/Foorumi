/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// userReducer -komponentti
/// Paul Kallio 5.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
const logger = require('simple-console-logger').getLogger('userReducer')

export const userAction = {
  CURRENT: 'currentUser'
}

export const setCurrentUser = username => {
  return {
    type: userAction.CURRENT,
    data: {
      username: username
    }
  }
}

const userReducer = (state={}, action) => {

  switch(action.type) {
    case userAction.CURRENT:
      logger.info(userAction.CURRENT, action)
      return action.data.username
    default:
      return state
  }
}
export default userReducer
