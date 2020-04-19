/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Taustapalvelut keskustelut -services
/// Paul Kallio 19.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import axios from 'axios'

const baseUrl = '/api/aiheet'
const addUrl = '/keskustelut'

const getAll = (id) => {
  const request = axios.get(`${baseUrl}/${id}${addUrl}`)
  return request.then(response => response.data)
}

export default {getAll}
