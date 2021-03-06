/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Taustapalvelut foorumi -services
/// Paul Kallio 17.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import axios from 'axios'
import {getAuth} from '../services/local/session'

const logger = require('simple-console-logger').getLogger('foorumi')
const baseUrl = '/api/aiheet'
const aaniUrl = '/aanestys'

/// GetAll - Hae kaikki aiheet
const getAll = () => {
  logger.info('axios.getAll:', `${baseUrl}`)
  const request = axios.get(baseUrl)
  return request.then(response => response.data.topic_list)
}

/// GetAihe - Hae aihe tunnisteella
const getAihe = (id) => {
  logger.info('axios.get:', `${baseUrl}/${id}`)
  const request = axios.get(`${baseUrl}/${id}`,{id: id})
  return request.then(response => response.data)
}

/// Create - luo uusi keskustelun aihe Foorumille
const create = async (newObject) => {
  logger.info('axios.create:', `${baseUrl}`)
  const response = await axios.post(`${baseUrl}`, newObject, getAuth())
  return response.data
}

/// Update - päivittää olemassa olevan keskustelun aiheen
const update = async (id, aihe) => {
  logger.info('axios.update:', `${baseUrl}/${id}`, aihe)
  const response = await axios.put(`${baseUrl}/${id}`, aihe, getAuth())
  return response.data
}

/// Remove - poista keskustelun aihe Foorumilta
const remove = async (id) => {
  logger.info('axios.remove:', `${baseUrl}/${id}`)
  const response = await axios.delete(`${baseUrl}/${id}`, getAuth())
  return response.data
}

/// vote - äänestä keskustelun aihetta
const vote = async (topicId, choice) => {
  logger.info('axios.vote:', `${baseUrl}/${topicId}${aaniUrl}`)
  const response = await axios.post(`${baseUrl}/${topicId}${aaniUrl}`, choice, getAuth())
  return response.data
}

/// getVote - Hae äänet aiheen tunnisteella
const getVote = (topicId) => {
  logger.info('axios.getVote:', `${baseUrl}/${topicId}${aaniUrl}`)
  const request = axios.get(`${baseUrl}/${topicId}${aaniUrl}`)
  return request.then(response => response.data)
}

export default {getAll, create, update, remove, getAihe, vote, getVote}
