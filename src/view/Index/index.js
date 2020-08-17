import React, { Fragment, Component, } from 'react'
import { Layout, Menu, Row, Col } from 'antd'
import { DesktopOutlined } from '@ant-design/icons';
import Ajax from '../../../Ajax'
import { BrowserRouter, Route, Switch, Link, withRouter, Redirect, useHistory } from 'react-router-dom';
import './index.less'
import { connect } from 'react-redux';
const { Header, Footer, Sider, Content } = Layout;
const { Item } = Menu;




class App extends Component {
    constructor(props) {
        super()
        this.state = {
            collapsed: false,
            menu: [{
                path: '/app/userTranslate',
                key: 'userTranslate',
                children: [],
                icon: <DesktopOutlined />,
                name: '用户管理'
            }],
            currentPath: '',

        };
    }

    componentWillMount() {
        // console.log(this.default,'mounted')

        // const params = {}
        // Ajax.post('users/menu', params).then(res => { })
        // this.setState({
        //     currentPath: this.props.location.pathname
        // })
    }
    onCollapse(toggle) {
        console.log(this)
        this.props.loginOut({ type: 0, value: false })
        this.setState({
            collapsed: toggle
        })
    }
    MenuClick(item) {
        console.log(item)
    }

    subMenuItem() {
       // https://www.baidu.com/link?url=KL7WoERnaXkySyH9iGM2IJLQG22JTOZPRX8KFvn5iCzXU8IKp4N8REe4bjJ66p_OJIBbtZzrFFQ3i-DzG5X537O6AZPQpzfiITDnRThkCQp8otQK91iHmCMfoJo1u-4pvXYmWSY4flaOQYz-2VbVLNjOBl21PyNpHMnVQ8HkNHXuJgb6vsNaanH1jB1e3OHXOvTDhMZgikfDquqHfinq6ti0jaNyVQPq0HOktChHjbOON0mZtfQulUOhwDlGvm-RsVXAW57iWhV28w-F5BjuNyhMdFIJ6SBBcAFlHi3UG7pD87oMaaJSEk5mCirUwPXLzBJBXa7w5gmwg02__r3mc4Ql9mOum5hRNT_5E-dtHQ4Xd7S5lvg55Xb_Seu6m8d7DcCq_c90SZRNaliq3bZFQq0A_7CiFFXrwmxO4u3jYqySlYkFTLOgbTYnNQWo-UPOuiSD2rgx-ijsLy1FoqKp5RU_q05R44JeAqY3-5MjPh7llc4ilA_WK751pvSJCFcJ7k43RuCnqjTd-tKxLJjDGsgTtfDK4dZ2RWD_mm1pjbve3npDp00ulqpOY1BmlWajmiVGnKIJ9q5WkOA-2okbPzfte5zZufYJJUUduW9_voW&timg=&click_t=1597652287135&s_info=1349_625&wd=&eqid=e90a060c0000080a000000035f3a3d35
        return this.state.menu.map(item => <Item icon={item.icon} key={item.key}><Link to={item.path}>{item.name}</Link></Item>)
    }

    onTabChange(key) {

        console.log(key)
    }
    render() {
        const { routes, ele } = this.props;
        const { currentPath } = this.state;
        return (
            <Fragment>
                <Layout className='container'>
                    <Sider  collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse.bind(this)}>
                        <Menu defaultSelectedKeys={currentPath} style={{ background: '#ccc' }} onClick={this.MenuClick.bind(this)}>
                            {this.subMenuItem()}
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header>121321</Header>
                        <Content>
                            <Switch>
                                {routes.map(item => <Route exact path={item.path} key={item.key} render={props => <item.component {...props}></item.component>}></Route>)}
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginOut: (actions) => dispatch(actions)
    }
}

export default connect((state) => ({ state }), mapDispatchToProps)(App) 
