import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'



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
  if (type === 0 || type === 1) {
    return state = Boolean(value)
  }
  return state
}

export default createStore(combineReducers({ Store, isLogin }), applyMiddleware(thunk, logger))