/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// aiheetAction -komponentti
/// Paul Kallio 7.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
export const aiheetAction = {
  LOAD: 'loadAiheet',
  ADD:  'addAiheet',
  DELETE: 'deleteAiheet',
  UPDATE: 'updateAiheet'
}

export function loadAiheet(aiheet) {
  return {
    type: aiheetAction.LOAD,
    data: {
      aiheet: aiheet
    }
  }
}

export function addAiheet(aihe) {
  return {
    type: aiheetAction.ADD,
    data: {
      aihe: aihe
    }
  }
}

export function deleteAiheet(aihe) {
  return {
    type: aiheetAction.DELETE,
    data: {
      aihe: aihe
    }
  }
}

export function updateAiheet(aihe) {
  return {
    type: aiheetAction.UPDATE,
    data: {
      aihe: aihe
    }
  }
}
