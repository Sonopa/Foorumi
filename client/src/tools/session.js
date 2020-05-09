/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Taustapalvelut: session -services
/// Paul Kallio 25.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
const logger = require('simple-console-logger').getLogger('session')

const foorumiStore = 'foorumiUser'
const foorumiID = 'foorumiID'

/// browserStore
const browserStore = () => {
  return window.localStorage
}

/// isLoggedIn
const isLoggedIn = () => browserStore().getItem(foorumiStore) ? true : false

/// getLoggedIn
const getLoggedIn = () => JSON.parse(browserStore().getItem(foorumiStore))

/// getUser
const getUser = () => {
  const userData = getLoggedIn()
  return userData ? userData.username : ''
}

/// isUserOwner
const isUserOwner = (owner) => {
  const user = getUser()
  return owner === user
}

/// getUserId
const getUserId = () => {
  const userData = JSON.parse(browserStore().getItem(foorumiID))
  return userData ? userData.id : 0
}

/// storeSession
const storeSession = (user, id) => {
  browserStore().setItem(foorumiID, JSON.stringify({id: id}))
  return (browserStore().setItem(foorumiStore, JSON.stringify(user)))
}

/// removeSession
const removeSession = () => {
  browserStore().removeItem(foorumiID)
  return (browserStore().removeItem(foorumiStore))
}

/// checkAuth
const checkAuth = (error) => {
  if(error && error.response && error.response.status) {
    if(error.response.status === 401) {
      removeSession()
      return true
    }
  }
  return false
}

/// getAuth
const getAuth = () => {
  const session = getLoggedIn()
  logger.info('getAuth.session', session)
  const token = (session && session.token) ? session.token : ''
  const author = {
    headers: { Authorization: `Bearer ${token}`}
  }
  return author
}

export {isLoggedIn, getLoggedIn, storeSession, removeSession, getAuth, checkAuth, getUser, getUserId, isUserOwner}
