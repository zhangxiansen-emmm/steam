import axios from 'axios'
import { get } from 'js-cookie'

const Ajax = axios.create({
  timeout: 1000,
  baseURL: '/media/',
})

Ajax.interceptors.request.use((config) => {
  console.log(config)
  const _t = new Date() / 1000
  config.headers['_t'] = _t
  // if (!config.url.includes('login') && !get('token')) {
  //   return Promise.reject(config)
  // }
  return config
})

Ajax.interceptors.response.use((config) => {
  return config.data
})

export default Ajax
