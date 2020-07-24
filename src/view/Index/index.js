import React, { Fragment, Component } from 'react'
import { Layout, Menu } from 'antd'
import Ajax from '../../../Ajax'
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
const { Header, Footer, Sider, Content } = Layout;
const { Item } = Menu;



class App extends Component {
    constructor(props) {
        console.log(props)
        super()
        this.state = {
            menu: [{
                path: '/app/table',
                key: 'table',
                children: []
            }, {
                path: '/app/introduce',
                key: 'introduce',
                children: []
            }, {
                path: '/app/index',
                key: 'index',
                children: []
            }]
        };
    }

    componentWillMount() {
        // console.log(this.props.routes)
        // const params = {}
        // Ajax.post('users/menu', params).then(res => { })
    }

    MenuClick(item) {
        console.log(item)
    }

    subMenuItem() {
        return this.state.menu.map(item => <Item key={item.key}><Link to={item.path}>{item.key}</Link></Item>)
    }

    render() {
        const { routes } = this.props
        // console.log(routes)
        return (
            <Fragment>
                <HashRouter>
                    <Layout>
                            
                        <Sider>
                            <Menu onClick={this.MenuClick.bind(this)}>
                                {this.subMenuItem()}
                            </Menu>
                        </Sider>
                        <Layout>
                            <Header>header</Header>
                            <Content>
                                <Switch>
                                    {routes.map(item => <Route exact path={item.path} key={item.key} render={props => <item.component {...props}></item.component>}></Route>)}
                                </Switch>
                            </Content>
                        </Layout>
                    </Layout>
                </HashRouter>
            </Fragment>
        )
    }
}

export default App
