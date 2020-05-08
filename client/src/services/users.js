/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Taustapalvelut: käyttäjät -services
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import axios from 'axios'
import {storeSession, removeSession, getAuth} from '../tools/session'
const logger = require('simple-console-logger').getLogger('users')

const userUrl = '/user'
const usersUrl = '/users'
const registerUrl = '/register'
const loginUrl = '/login'
const logoutUrl = '/logout'

/// GetAll - Hae kaikki käyttäjät
const getAll = () => {
  logger.info('axios.getAll', usersUrl)
  const request = axios.get(usersUrl)
  return request.then(response => {
    logger.info('axios.getAll', response.data)
    return response.data})
}

/// GetUser - Hae käyttäjä tunniste -numerolla
const getUser = (id) => {
  const request = axios.get(`${usersUrl}/${id}`)
  logger.info('axios.getUser', `${usersUrl}/${id}`)
  return request.then(response => response.data)
}

/// Create - luo uusi käyttäjä Foorumille
const create = async (newObject) => {
  const response = await axios.post(`${registerUrl}`, newObject)
  logger.info('axios.create', `${registerUrl}`, newObject, response)
  return response.data
}

/// Update - päivitä käyttäjän tiedot
const update = async (userId, newObject) => {
  const response = await axios.put(`${userUrl}/${userId}`, newObject, getAuth())
  logger.info('axios.update', `${usersUrl}/${userId}`, newObject, response)
  return response.data
}

/// Remove - poista käyttäjä Foorumilta
const remove = async (userId) => {
  const response = await axios.delete(`${usersUrl}/${userId}`, getAuth())
  logger.info('axios.delete:', `${usersUrl}/${userId}`, response)
  return response.data
}

/// Login - kirjaudu sisään
const login = async (newObject) => {
  const response = await axios.post(`${loginUrl}`, newObject)
  logger.info('axios.login', `${loginUrl}`, newObject, response)
  const user = {
    token: response.data.session.token,
    username: response.data.session.username
  }
  logger.info('axios.login.user', user, response.data.session.user_id)
  storeSession(user, response.data.session.user_id)
  return response.data
}

/// Logout - kirjaudu ulos
const logout = async (newObject) => {
  removeSession(newObject)
  const response = await axios.post(`${logoutUrl}`, newObject, getAuth())
  logger.info('axios.logout.Url:', `${logoutUrl}`, newObject, response)
  return response.data
}

export default {getAll, getUser, create, update, remove, login, logout}
