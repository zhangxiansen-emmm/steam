import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'



const Store = (state = 'name', actions) => {
  const { type } = actions
  switch (type) {
  case 'USERNAME':
    return state = 'USERNAME'

  default:
    return state
  }
}

export default createStore(combineReducers({
  state: Store
}), applyMiddleware(thunk, logger))