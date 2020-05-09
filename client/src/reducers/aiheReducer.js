/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// aiheReducer -komponentti
/// Paul Kallio 5.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import {aiheAction} from '../actions/aiheAction'
const logger = require('simple-console-logger').getLogger('aiheReducer')

/// Aihe Reducer
const aiheReducer = (state={}, action) => {

  switch(action.type) {
    case aiheAction.CURRENT:
      logger.info(aiheAction.CURRENT, action)
      return action.data ? action.data : {_id:0}
    default:
      return state
  }
}
export default aiheReducer
