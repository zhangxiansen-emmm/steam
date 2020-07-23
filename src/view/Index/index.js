import React, { Fragment, Component } from 'react'
import { Layout, Menu } from 'antd'
import Ajax from '../../../Ajax'
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import Routes from '../../routes'
const { Header, Footer, Sider, Content } = Layout;
const { Item } = Menu;


export default class App extends Component {
    constructor(props) {
        console.log(props)
        super()
        this.state = {
            menu: [{
                path: '/#/app/index',
                key: 'table',
                children: []
            }, {
                path: '/#/app/introduce',
                key: 'introduce',
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
        return this.state.menu.map(item => <Item key={item.key}><a href={item.path}>{item.key}</a></Item>)
    }

    render() {
        // const { routes } = this.props
        // console.log(routes)
        return (
            <Fragment>
                <Layout>
                    <Sider>
                        {/* <Menu onClick={this.MenuClick.bind(this)}>
                            {this.subMenuItem()}
                        </Menu> */}
                        {/* <Link to={'/app/index'}>1111</Link> */}
                    </Sider>
                    <Layout>
                        <Header>header</Header>
                        <Content>
                            <HashRouter>
                                <Switch>
                                    {/* {routes.map(item => <Route exact key={item.key} render={props => <item.component {...props}></item.component>}></Route>)} */}
                                    <Route  path={'/app/index'} render={()=><div>1123213</div>}></Route>
                                </Switch>
                            </HashRouter>

                        </Content>
                    </Layout>
                </Layout>
            </Fragment>
        )
    }
}
