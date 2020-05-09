/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// userAction -komponentti
/// Paul Kallio 9.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
/// User Action Name
export const userAction = {
  CURRENT: 'currentUser'
}

/// set Current User Action
export const setCurrentUser = user => {
  return {
    type: userAction.CURRENT,
    data: user
  }
}
