/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Taustapalvelut: session -services
/// Paul Kallio 25.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
const logger = require('simple-console-logger').getLogger('session')

const foorumiStore = 'foorumiUser'
const foorumiID = 'foorumiID'
const browserStore = () => {
  return window.localStorage
}

const isLoggedIn = () => browserStore().getItem(foorumiStore) ? true : false

const getLoggedIn = () => JSON.parse(browserStore().getItem(foorumiStore))

const getUser = () => {
  const userData = getLoggedIn()
  return userData ? userData.username : ''
}

const isUserOwner = (owner) => {
  const user = getUser()
  return owner === user
}

const getUserId = () => {
  const userData = JSON.parse(browserStore().getItem(foorumiID))
  return userData ? userData.id : 0
}

const storeSession = (user, id) => {
  browserStore().setItem(foorumiID, JSON.stringify({id: id}))
  return (browserStore().setItem(foorumiStore, JSON.stringify(user)))
}

const removeSession = () => {
  browserStore().removeItem(foorumiID)
  return (browserStore().removeItem(foorumiStore))
}

const checkAuth = (error) => {
  if(error && error.response && error.response.status) {
    if(error.response.status === 401) {
      removeSession()
      return true
    }
  }
  return false
}

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