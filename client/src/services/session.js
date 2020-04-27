/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Taustapalvelut: session -services
/// Paul Kallio 25.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
const logger = require('simple-console-logger').getLogger('session')

const foorumiStore = 'foorumiUser'
const browserStore = () => {
  return window.localStorage
}

const isLoggedIn = () => browserStore().getItem(foorumiStore) ? true : false

const getLoggedIn = () => JSON.parse(browserStore().getItem(foorumiStore))

const getUser = () => {
  const userData = getLoggedIn()
  return userData ? userData.username : ''
}

const storeSession = (user) => {

  return (browserStore().setItem(foorumiStore, JSON.stringify(user)))
}

const removeSession = () => {
  return (browserStore().removeItem(foorumiStore))
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

export {isLoggedIn, getLoggedIn, storeSession, removeSession, getAuth, getUser}
