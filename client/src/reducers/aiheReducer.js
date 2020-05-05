/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// aiheReducer -komponentti
/// Paul Kallio 5.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
const logger = require('simple-console-logger').getLogger('aiheReducer')

const aiheAction = {
  INIT: 'initAihe',
  ADD: 'addAihe',
  DELETE: 'deleteAihe',
  UPDATE: 'updateAihe'
}

const aiheReducer = (state={}, action) => {

  switch(action.type) {
    case aiheAction.ADD:
      logger.info(aiheAction.ADD, action)
      return state
    case aiheAction.UPDATE:
      logger.info(aiheAction.UPDATE, action)
      return state
    case aiheAction.DELETE:
      logger.info(aiheAction.DELETE, action)
      return state
    case aiheAction.INIT:
      logger.info(aiheAction.INIT, action)
      return state
    default:
      return state
  }
}
export default aiheReducer
