/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// aiheetAction -komponentti
/// Paul Kallio 9.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
/// aiheAction
export const aiheAction = {
  CURRENT: 'currentAihe'
}

/// setCurrentAihe
export const setCurrentAihe = aihe => {
  return {
    type: aiheAction.CURRENT,
    data: aihe
  }
}
