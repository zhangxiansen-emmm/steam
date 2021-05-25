import axios from 'axios'
import { getCookie } from '@utils/cookie.js'

const Ajax = axios.create({
  timeout: 1000,
  baseURL: '/api/',
})

Ajax.interceptors.request.use((config) => {
  const _t = new Date() / 1000
  config.headers['_t'] = _t
  config.headers['token'] = getCookie('token')
  return config
})

Ajax.interceptors.response.use((config) => {
  return config
})

export default Ajax
