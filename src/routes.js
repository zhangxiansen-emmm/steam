import React from 'react'
import App from '@View/Index'
import Login from '@View/Login'

const routes = [
  {
    path: '/',
    component: App,
    key: 'app',
    exact: false,
    children: [{
      path: '/app/table',
      component: () => <div>231312321</div>,
      key: 'table',
      exact: true
    }, {
      path: '/app/introduce',
      component: () => <div>11111</div>,
      key: 'introduce',
      exact: true,
    }, {
      path: '/app/index',
      component: () => <div>11111</div>,
      key: 'index',
      exact: true,
    }]
  },
  {
    path: '/login',
    component: Login,
    exact: true,
    key: 'login'
  },
]

export default routes
