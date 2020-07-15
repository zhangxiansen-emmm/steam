import React, { Component } from 'react'
import ReactDom from 'react-dom'

class App extends Component {
  constructor() {
    super()
    this.state = {
      count: 1
    }
  }
  click() {
    const { count } = this.state
    this.setState({
      count: count + 1
    })
  }
  render() {
    return (
      <div onClick={() => this.click()}>{this.state.count}</div>
    )
  }
}

ReactDom.render(<App />, document.querySelector('#root'))