/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// aiheetAction -komponentti
/// Paul Kallio 9.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import {aiheetAction} from './aiheetAction'
const logger = require('simple-console-logger').getLogger('aiheAction')

/// aiheAction
export const aiheAction = {
  CURRENT:  'currentAihe'
}

/// setCurrentAiheByIdMWare
export function setCurrentAiheByIdMWare(topicId) {
  return function(dispatch, getState) {

    const aiheet = getState().aiheet
    const index = aiheet.findIndex(aihe => aihe._id === topicId)
    const aihe = (index > -1) ? aiheet.slice(index, index + 1)[0] : {_id:0}
    logger.info('setCurrentAiheByIdMWare.aihe', topicId, aihe)

    dispatch({
      type: aiheAction.CURRENT,
      data: aihe
    })
  }
}

/// updateActiveAiheMWare
export function updateActiveAiheMWare(aihe) {
  return function(dispatch, getState) {

    logger.info('updateActiveAiheMWare.aihe', aihe)

    dispatch({
      type: aiheAction.CURRENT,
      data: aihe
    })

    dispatch({
      type: aiheetAction.UPDATE,
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
