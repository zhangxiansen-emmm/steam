import React, { createContext } from 'react'
import { useReducer, useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd'
import Store from '@redux/store'
const Context = createContext(Store)
// const [state, dispatch] = useReducer(Store, [])
// console.log(state,'state')
export default (props) => {
  console.log(props)

  return (
    <Context.Provider>
      <div>
        <Table />
      </div>
    </Context.Provider>
  )
}
