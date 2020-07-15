import React, { Component, Fragment } from 'react'
import ReactDom from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import { Row, Col } from 'antd'
import 'antd/dist/antd.css'
import './index.scss'
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
      <Fragment>
        <Row type='flex' align='center' justify='center'>
          <Col span={3} ><div className='oneday'>143</div></Col>
        </Row><Row type='flex' align='center' justify='center'>
          <Col span={3} ><div className='oneday'>143</div></Col>
        </Row><Row type='flex' align='center' justify='center'>
          <Col span={3} ><div className='oneday'>143</div></Col>
        </Row>
      </Fragment>
    )
  }
}
class Login extends Component {
  constructor() {
    super()
    this.state = {
      count: 5
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
      <Fragment>
        <div className='oneday' onClick={() => this.click()}>{this.state.count}</div>
      </Fragment>
    )
  }
}
// hash 路由 可以用hashchange on   browserRouter 每次切换会向后台请求一个接口  即服务器路由
ReactDom.render((
  <HashRouter>
    <div>
      <Route path='/' exact component={App}></Route>
      <Route path='/login' exact component={Login}></Route>
      <Route path='/detail/:id' exact component={() => <div>4</div>}></Route>
    </div>
  </HashRouter>), document.querySelector('#root'))