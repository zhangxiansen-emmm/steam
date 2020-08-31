import React from 'react'
import { Spin } from 'antd'

export default (component) => {
  return class AsyncComponent extends React.Component {
    constructor(props) {
      super()
      this.state = {
        component: null,
      }
    }

    async UNSAFE_componentWillMount() {
      const nodes = await component()
      this.setState({
        component: nodes.default,
      })
    }

    render() {
      const Ele = this.state.component
      return Ele ? <Ele {...this.props} /> : <Spin />
    }
  }
}
