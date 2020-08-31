import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { getCookie, removeCookie, setCookie } from '@utils/cookie'
import proxyAudio from '../../getAudio'
// import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'

// const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
// })
const Store = (state = false, actions) => {
  const { type } = actions
  switch (type) {
    case 'USERNAME':
      return (state = true)
    default:
      return state
  }
}
const isLogin = (state = false, actions) => {
  const { type, value } = actions
  switch (type) {
    case 'login:out':
      console.log(1)
      removeCookie('isLogin')
      removeCookie('token')
    case 'login':
      setCookie('isLogin', true)
  }
  return getCookie('isLogin') || false
}

const clickMenu = (state = [], actions) => {
  const { type, value } = actions
  switch (type) {
    case 'clickMenu':
      state.push(value)
      return state
    default:
      return state
  }
}

const songUrl = (state = '', actions) => {
  const { type, value } = actions
  if (type === 'getSongUrl') {
    const params = Object.assign(value)
    proxyAudio.post('/song/url', params).then((res) => {
      console.log(res)
      state = res
    })
    return state
  }
  return state
}

const AudioData = (state = [], actions) => {
  const { type, value } = actions
  switch (type) {
    case 'setAudioData':
      state = value
      return state
    case 'getAudioData':
      return state
    default:
      return state
  }
}

export default createStore(
  combineReducers({ Store, isLogin, clickMenu, songUrl, AudioData }),
  applyMiddleware(thunk, logger)
)
