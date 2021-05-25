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
    Progress,
    List,
    message
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
import store from '../../redux/store'
import Audio from './Components/Audio'

class App extends Component {
    constructor(props) {
        super()
        this.state = {
            collapsed: false,
            searchKey: 'outside',
            englist: new Array(),
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
            showModal: false,
            percent: 50,
            url: store.getState().playMusicUrl
        }
        store.subscribe(() => store.getState());
    }
    componentDidUpdate() {
        if (this.state.url !== store.getState().playMuplayedsicUrl) {
            // this.refs.audio.src = store.getState().playMusicUrl;
            // console.log(this.refs.audio.play())
        }
    }
    componentDidMount() {
        console.log(this.props.state);
        let arr = [5, 6, 7, 8, 9]

        function forof(arr, cb) {
            let iterator = arr[Symbol.iterator]()
            let result = iterator.next()
            while (!result.done) {
                cb(result.value)
                result = iterator.next()
                console.log(result);
            }
        }

        forof(arr, function (item) {
            console.log(item)
        })

        // for of 迭代器 含有next的方法就算是迭代器    while 去判断当前的方法done是否可以继续迭代 



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
                <Link to={item.path}>{item.text}22</Link>
            </Breadcrumb.Item>
        ))
    }
    historyPath = (e) => {
        const node = e.currentTarget
        const currentPath = [node.getAttribute('index')]
        this.setState({
            currentPath,
        })
    }
    async ShowModal() {
        this.props.getSongsInfo({ type: 'songsInfo', value: this.props.getSongId() })
        const { lrc, tlyric } = await store.getState().songsInfo
        try {
            if (!lrc && !lrc.length) {
                throw ('请先搜索歌曲')
            }
            let [englist, chinese] = [lrc.lyric.split('\n'), tlyric.lyric.split('\n')]
            englist = englist.map((item, index) => {
                const params = new Object()
                const lyric = item.split(']')
                Object.assign(params, {
                    timer: lyric[0].slice(1),
                    lyric: lyric[1],
                    uid: index
                })
                return params
            })
            this.setState(() => ({ englist, showModal: true }))
        } catch (e) {
            message.error(e)
        }
        // style={{ top }}
        let height = document.querySelector('.React-Modal-Body').clientHeight
        console.log(height, 'height');
        this.setState({
            top: parseInt(height / 2)
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
    ScorllHeader(e) {
        this.refs.Header.className =
            "Header" + (e.target.scrollTop > this.refs.Header.clientHeight
                ? " Fixed"
                : "");
    }
    searchMedia() {
        const { searchKey, } = this.state
        const params = {
            keywords: searchKey,
        }
        proxyAudio.post('search', params).then((res) => {
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
    modalCencel = () => {
        this.setState({
            showModal: false
        })
    }

    render() {

        const menu = () => {
            const whowClick = (e) => {
                switch (true) {
                    case e.key === 'seeMyInfo':
                        this.setState({
                            visible: true
                        })
                        return
                    case e.key === 'login:out':
                        this.props.loginOut({
                            type: 'login:out',
                            value: false,
                        })
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
        const { currentPath, englist, top } = this.state
        const { clickMenu } = this.props.state

        return (
            <Fragment>
                <Layout className="container">
                    <Sider
                        style={{ background: "#fff" }}
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
                    <Layout onScroll={this.ScorllHeader.bind(this)}>
                        <div className="Header" ref="Header">
                            <Row type="flex" align="middle" justify="end">
                                <Col span={2}>音乐专栏</Col>
                                <Col span={3}>
                                    <Input onChange={this.SearchKey} className="radius" />
                                </Col>
                                <Col span={2}>
                                    <Button

                                        onClick={this.searchMedia.bind(this)}
                                        type="primary"
                                        className="buttonRadius"
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
                                            style={{ background: "#096dd9" }}
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
                        </div>
                        <Content>
                            <Switch>
                                {routes.map((item) => (
                                    <Route
                                        exact
                                        path={item.path}
                                        key={item.key}
                                        component={AsyncComponent(() => item.component())}
                                    ></Route>
                                ))}
                            </Switch>
                            <Button
                                onClick={this.ShowModal.bind(this)}
                                type="primary"
                                className="buttonRadius"
                                icon={<SearchOutlined />}
                                shape="round"
                            >
                                showModal
                  </Button>
                            <Audio />
                        </Content>
                    </Layout>
                </Layout>

                <Modal visible={this.state.showModal} drag footer={null} onCencel={this.modalCencel}>
                    <div className='lycWrapper' style={{ top }}>
                        {englist.map((item) =>
                        (<Row type='flex' justify='center' align='middle' key={item.uid}>
                            <Col> {item.lyric} </Col>
                        </Row>))}
                    </div>
                </Modal>
            </Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginOut: (actions) => dispatch(actions),
        clickMenuItem: (actions) => dispatch(actions),
        getAudioUrl: (actions) => dispatch(actions),
        setAudioData: (actions) => dispatch(actions),
        getSongId: () => store.getState().songId,
        getSongsInfo: (actions) => dispatch(actions)
    }
}

export default connect((state) => ({ state }), mapDispatchToProps)(App)
