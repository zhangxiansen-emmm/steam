import React, { Component, Fragment } from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Store from './redux/store'
import { Provider, connect } from 'react-redux'
import Ajax from '../Ajax'
import { Layout } from 'antd'
import Routes from './routes'
import 'antd/dist/antd.css'
import './assets/index.css'
import './assets/my_theme.less'
import Headers from '@View/Header'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// require('./color.js')  


const { Header, Footer, Sider, Content } = Layout

Store.subscribe(() => Store.getState())
class App extends Component {
  constructor(props) {
    super()
    this.state = {}
  }



  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <Switch>
            {Routes.map((item) => {
              return (
                <Route
                  path={item.path}
                  exact={item.exact || false}
                  // component={item.component}
                  render={props => <item.component {...props} routes={item.children} />}
                  key={item.key}
                ></Route>
              )
            })}
          </Switch>
        </BrowserRouter>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return { state }
}
const mapDispatchToProps = dispatch => {
  return {
    addClick: (actions) => dispatch(actions)
  }
}
const Root = connect(mapStateToProps, mapDispatchToProps)(App)
// const Root = connect(mapStateToProps, mapDispatchToProps)(App)
// hash 路由 可以用hashchange on   browserRouter 每次切换会向后台请求一个接口  即服务器路由
ReactDom.render(
  <Provider store={Store}>
    <Root />
  </Provider>, document.querySelector('#root'))
