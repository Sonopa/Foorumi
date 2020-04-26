/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Taustapalvelut: session -services
/// Paul Kallio 25.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
const logger = require('simple-console-logger').getLogger('session')

const foorumiStore = 'foorumiUser'

const isLoggedIn = () => window.localStorage.getItem(foorumiStore) ? true : false

const getLoggedIn = () => JSON.parse(window.localStorage.getItem(foorumiStore))

const storeSession = (user) => {

  return (window.localStorage.setItem(foorumiStore, user))
}

const removeSession = () => {
  return (window.localStorage.removeItem(foorumiStore))
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

export {isLoggedIn, getLoggedIn, storeSession, removeSession, getAuth}
