import axios from 'axios'
import { get } from 'js-cookie'

const Ajax = axios.create({
  timeout: 1000,
})

Ajax.interceptors.request.use((config) => {});

Ajax.interceptors.response.use((config) => {});


export default Ajax