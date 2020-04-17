/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Taustapalvelut foorumi -services
/// Paul Kallio 17.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import axios from 'axios'

const baseUrl = '/api/aiheet'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default {getAll}
