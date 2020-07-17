import React, { Component, Fragment } from 'react'
import ReactDom from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import Ajax from '../Ajax'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import './assets/my_theme.less'
import Headers from '@View/Header'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const { Header, Footer, Sider, Content } = Layout
class App extends Component {
  constructor() {
    super()
    this.state = {
      toggleSider: false
    }
  }
  toggleSider(toggle) {
    this.setState({
      toggleSider: toggle
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
    // Ajax.get('/#login', {}).then(res => { console.log(res) })
    const { toggleSider } = this.state
    return (
      <Fragment>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={toggleSider} onCollapse={this.toggleSider.bind(this)}>Sider</Sider>
          <Layout>
            <Header>
              <Headers />
            </Header>
            <Content>
              <HashRouter>
                <div>
                  {/* <Route path='/' exact component={App}></Route> */}
                </div>
              </HashRouter>
            </Content>
          </Layout>
        </Layout>
      </Fragment>
    )
  }
}

// hash 路由 可以用hashchange on   browserRouter 每次切换会向后台请求一个接口  即服务器路由
ReactDom.render(<App />, document.querySelector('#root'))