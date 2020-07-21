import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'



const Store = (state = 'name', actions) => {
  const { type } = actions
  console.log(type)
  switch (type) {
  case 'USERNAME':
    return state = 'USERNAME'

  default:
    return state
  }
}

export default createStore(Store, applyMiddleware(thunk))