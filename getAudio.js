import axios from 'axios'
import { getCookie } from '@utils/cookie.js'

const proxyAudio = axios.create({
    timeout: 1000,
    baseURL: '/media/',
})

proxyAudio.interceptors.request.use((config) => {
    console.log(config)
    const _t = new Date() / 1000
    config.headers['timestamp'] = parseInt(_t)
    config.headers['token'] = getCookie('token')
    return config
})

proxyAudio.interceptors.response.use((config) => {
    return config.data
}, (e) => {
    return Promise.reject(e)
})

export default proxyAudio
