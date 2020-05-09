/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// userReducer -komponentti
/// Paul Kallio 5.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import {userAction} from '../actions/userAction'
const logger = require('simple-console-logger').getLogger('userReducer')

/// User Reducer
const userReducer = (state={}, action) => {

  switch(action.type) {
    case userAction.CURRENT:
      logger.info(userAction.CURRENT, action)
      return action.data
    default:
      return state
  }
}
export default userReducer
