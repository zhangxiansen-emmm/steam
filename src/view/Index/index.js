import React, { Fragment, Component } from 'react'
import {
  Layout,
  Menu,
  Row,
  Col,
  Breadcrumb,
  Input,
  Button,
  Dropdown,
  Avatar,
  Progress
} from 'antd'
import {
  DesktopOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons'

import Ajax from '../../../Ajax'
import proxyAudio from '../../../getAudio'
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  withRouter,
  Redirect,
  useHistory,
} from 'react-router-dom'
import './index.less'
import { connect } from 'react-redux'
import Store from '@redux/store'
const { Header, Footer, Sider, Content } = Layout
const { Item } = Menu
import AsyncComponent from '@Components/AsyncComponent'
import Modal from '@Components/Modal'
class App extends Component {
  constructor(props) {
    super()
    this.state = {
      collapsed: false,
      menu: [
        {
          path: '/app/userTranslate',
          key: 'userTranslate',
          children: [],
          icon: <DesktopOutlined />,
          name: '用户管理',
        },
        {
          path: '/app/addUser',
          key: 'addUser',
          children: [],
          icon: <DesktopOutlined />,
          name: '用户添加',
        },
      ],
      currentPath: [],
      visible: false,
      percent: 0
    }
    Store.subscribe(() => Store.getState())
  }
  UNSAFE_componentDidMount() {
    // const params = {}
    // Ajax.post('users/menu', params).then(res => { })
    // this.setState({
    //     currentPath: this.props.location.pathname
    // })
  }
  onCollapse(toggle) {
    // this.props.loginOut({ type: 0, value: false })
    this.setState({
      collapsed: toggle,
    })
  }
  MenuClick(obj) {
    const { clickMenuItem } = this.props
    const { clickMenu } = this.props.state
    const json = {
      path: obj.keyPath[0],
      text: obj.item.node.innerText,
    }
    this.setState({
      currentPath: obj.keyPath,
    })
    !clickMenu.filter((item) => item.path === json.path).length &&
      clickMenuItem({
        type: 'clickMenu',
        value: json,
      })
  }
  breadcrumbItem() {
    const { clickMenu } = this.props.state
    return clickMenu.map((item) => (
      <Breadcrumb.Item
        index={item.path}
        onClick={this.historyPath}
        key={item.path}
      >
        <Link to={item.path}>{item.text}</Link>
      </Breadcrumb.Item>
    ))
  }
  historyPath = (e) => {
    const node = e.currentTarget
    const currentPath = [node.getAttribute('index')]
    console.log(currentPath)
    this.setState({
      currentPath,
    })
  }
  handleOk = () => {
    this.handleCancel()
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  subMenuItem() {
    // https://www.baidu.com/link?url=KL7WoERnaXkySyH9iGM2IJLQG22JTOZPRX8KFvn5iCzXU8IKp4N8REe4bjJ66p_OJIBbtZzrFFQ3i-DzG5X537O6AZPQpzfiITDnRThkCQp8otQK91iHmCMfoJo1u-4pvXYmWSY4flaOQYz-2VbVLNjOBl21PyNpHMnVQ8HkNHXuJgb6vsNaanH1jB1e3OHXOvTDhMZgikfDquqHfinq6ti0jaNyVQPq0HOktChHjbOON0mZtfQulUOhwDlGvm-RsVXAW57iWhV28w-F5BjuNyhMdFIJ6SBBcAFlHi3UG7pD87oMaaJSEk5mCirUwPXLzBJBXa7w5gmwg02__r3mc4Ql9mOum5hRNT_5E-dtHQ4Xd7S5lvg55Xb_Seu6m8d7DcCq_c90SZRNaliq3bZFQq0A_7CiFFXrwmxO4u3jYqySlYkFTLOgbTYnNQWo-UPOuiSD2rgx-ijsLy1FoqKp5RU_q05R44JeAqY3-5MjPh7llc4ilA_WK751pvSJCFcJ7k43RuCnqjTd-tKxLJjDGsgTtfDK4dZ2RWD_mm1pjbve3npDp00ulqpOY1BmlWajmiVGnKIJ9q5WkOA-2okbPzfte5zZufYJJUUduW9_voW&timg=&click_t=1597652287135&s_info=1349_625&wd=&eqid=e90a060c0000080a000000035f3a3d35
    return this.state.menu.map((item) => (
      <Item icon={item.icon} key={item.key}>
        <Link to={item.path}>{item.name}</Link>
      </Item>
    ))
  }

  searchMedia() {
    const { searchKey } = this.state
    const params = {
      keywords: searchKey,
    }
    console.log(proxyAudio)
    proxyAudio.post('search', params).then((res) => {
      console.log(res)
      this.props.setAudioData({
        type: 'setAudioData',
        value: res.result.songs,
      })
    })
  }
  SearchKey = (e) => {
    this.setState({
      searchKey: e.currentTarget.value,
    })
  }
  render() {
    const menu = () => {
      const whowClick = (e) => {
        console.log(e)
        switch (true) {
          case e.key === 'seeMyInfo':
            console.log(e.key)
            this.setState({
              visible: true
            })
            return
          case e.key === 'login:out':
            this.props.loginOut({
              type: 'login:out',
              value: false,
            })
            Store.subscribe(() => Store.getState())
            return
        }
      }
      return (
        <Menu onClick={whowClick}>
          <Menu.Item key="seeMyInfo">查看个人信息</Menu.Item>
          <Menu.Item key="login:out">退出登录</Menu.Item>
        </Menu>
      )
    }
    const { routes, ele } = this.props
    const { currentPath } = this.state
    const { clickMenu } = this.props.state
    return (
      <Fragment>
        <Layout className="container">
          <Sider
            style={{ background: '#fff' }}
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse.bind(this)}
          >
            <Menu
              selectedKeys={currentPath}
              onClick={this.MenuClick.bind(this)}
            >
              {this.subMenuItem()}
            </Menu>
          </Sider>
          <Layout>
            <div className="Header">
              <Row type="flex" align="middle" justify="end">
                <Col span={2}>音乐专栏</Col>
                <Col span={3}>
                  <Input onChange={this.SearchKey} />
                </Col>
                <Col span={2}>
                  <Button
                    onClick={this.searchMedia.bind(this)}
                    type="primary"
                    icon={<SearchOutlined />}
                    shape="round"
                  >
                    Search
                  </Button>
                </Col>
                <Col span={1}>
                  <Dropdown overlay={menu()} trigger="click">
                    <Avatar
                      shape="square"
                      style={{ background: '#096dd9' }}
                      size={64}
                      icon={<UserOutlined />}
                    />
                  </Dropdown>
                </Col>
              </Row>
              <Breadcrumb>
                <Breadcrumb.Item onClick={this.historyPath}>
                  <Link to="/">index</Link>
                </Breadcrumb.Item>
                {this.breadcrumbItem()}
              </Breadcrumb>
              <audio preload='auto' ref='audio'
                play={this.state.play}
                autoPlay={true} controls style={{ display: 'none', width: 200, height: 100 }}></audio>
            </div>
            <Content>
              <Switch>
                {routes.map((item) => (
                  <Route
                    exact
                    path={item.path}
                    key={item.key}
                    component={AsyncComponent(() => import('../UserTranslate'))}
                  >
                  </Route>
                ))}
              </Switch>
              <audio controls='controls' ></audio>
            </Content>
          </Layout>
        </Layout>


        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Progress type="circle" percent={this.state.percent}></Progress>
        </Modal>
      </Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginOut: (actions) => dispatch(actions),
    clickMenuItem: (actions) => dispatch(actions),
    getAudioUrl: (actions) => dispatch(actions),
    setAudioData: (actions) => dispatch(actions),
  }
}

export default connect((state) => ({ state }), mapDispatchToProps)(App)
