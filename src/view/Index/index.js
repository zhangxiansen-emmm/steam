import React, { Fragment, Component, } from 'react'
import { Layout, Menu, Card } from 'antd'
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
                    <Sider style={{ background: '#ccc' }} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse.bind(this)}>
                        <Menu defaultSelectedKeys={currentPath} style={{ background: '#ccc' }} onClick={this.MenuClick.bind(this)}>
                            {this.subMenuItem()}
                        </Menu>
                    </Sider>
                    <Layout>
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
