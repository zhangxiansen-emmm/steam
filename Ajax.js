import axios from 'axios'
import { get } from 'js-cookie'

const Ajax = axios.create({
  timeout: 1000,
})

Ajax.interceptors.request.use((config) => {
  if(get('token')){

    return Promise.reject(config)
  }
  return config
})

Ajax.interceptors.response.use((config) => {})


export default Ajax