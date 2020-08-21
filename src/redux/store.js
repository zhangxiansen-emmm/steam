import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { getCookie, removeCookie, setCookie } from '@utils/cookie'
import Ajax from '@http'


const Store = (state = false, actions) => {
  const { type } = actions
  switch (type) {
    case 'USERNAME':
      return state = true
    default:
      return state
  }
}
const isLogin = (state = false, actions) => {
  const { type, value } = actions;
  if (getCookie('isLogin')) {
    state = getCookie('isLogin');
  } else {
    switch (type) {
      case 0:
        removeCookie('isLogin');
      case 1:
        setCookie('isLogin', true)
    }
    state = Boolean(value)
  }
  return state
}
const clickMenu = (state = [], actions) => {
  const { type, value } = actions;
  switch (type) {
    case 'clickMenu':
      state.push(value)
      return state
    default:
      return state
  }
}

const songUrl = (state = '', actions) => {
  const { type, params: value } = actions
  if (type === 'getSongUrl') {
    return Ajax.post('/song/url', params)
  }
}


export default createStore(combineReducers({ Store, isLogin, clickMenu, songUrl }), applyMiddleware(thunk, logger))