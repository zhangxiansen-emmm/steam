import React, { Component, Fragment } from 'react'
import ReactDom from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import Store from './redux/store'
import Ajax from '../Ajax'
import { Layout, ConfigProvider } from 'antd'
import Routes from './routes'
import 'antd/dist/antd.css'
import './assets/index.css'
import './assets/my_theme.less'
import Headers from '@View/Header'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const { Header, Footer, Sider, Content } = Layout

Store.subscribe(() => Store.getState())
class App extends Component {
  constructor() {
    super()
    this.state = {
      toggleSider: false,
    }
  }
  toggleSider(toggle) {

    this.setState({
      toggleSider: toggle,
    })
  }
  componentDidMount() {
    // window.addEventListener('hashchange', function () {
    //   Nprogress.start()
    //   setTimeout(()=>{
    //     Nprogress.done()
    //   },3000)
    // },false)
  }
  render() {
    const { toggleSider } = this.state
    return (
      <Fragment>
        <HashRouter>
          {Routes.map((item) => {
            // console.log()
            return (
              <Route
                path={item.path}
                exact={item.exact}
                // component={item.component}
                render={props => <item.component {...props} />}
                key={item.key}
              ></Route>
            )
          })}
        </HashRouter>
      </Fragment>
    )
  }
}

// hash 路由 可以用hashchange on   browserRouter 每次切换会向后台请求一个接口  即服务器路由
ReactDom.render(
  <ConfigProvider name={1}>
    <App />
  </ConfigProvider>, document.querySelector('#root'))
