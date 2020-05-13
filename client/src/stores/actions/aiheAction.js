/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// aiheetAction -komponentti
/// Paul Kallio 9.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
const logger = require('simple-console-logger').getLogger('aiheAction')

/// aiheAction
export const aiheAction = {
  CURRENT:  'currentAihe',
  UPDATE:   'updateAihe'
}

/// updateActiveAiheMWare
export function updateActiveAiheMWare(keskustelu) {
  return function(dispatch, getState) {

    // const username = getUser()
    const aihe = getState().aihe

    // const index = users.findIndex(item => item.username === username)
    // const user = (index > -1) ? users.slice(index, index + 1)[0] : {_id:0}
    logger.info('updateActiveAiheMWare.keskustelu', keskustelu, aihe)

    dispatch({
      type: aiheAction.UPDATE,
      data: aihe
    })
  }
}

/// setCurrentAihe
export const setCurrentAihe = aihe => {
  return {
    type: aiheAction.CURRENT,
    data: aihe
  }
}
