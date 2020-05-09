/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// aiheReducer -komponentti
/// Paul Kallio 5.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
const logger = require('simple-console-logger').getLogger('aiheReducer')

/// User
const aiheAction = {
  CURRENT: 'currentAihe'
}

/// User
export const setCurrentAihe = aihe => {
  return {
    type: aiheAction.CURRENT,
    data: {
      aihe: aihe
    }
  }
}

/// User
const aiheReducer = (state={}, action) => {

  switch(action.type) {
    case aiheAction.CURRENT:
      logger.info(aiheAction.CURRENT, action)
      return action.data.aihe ? action.data.aihe : {_id:0}
    default:
      return state
  }
}
export default aiheReducer
