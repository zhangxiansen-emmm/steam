import React from 'react'
import Login from '@View/Login'
import App from '@View/Index'
console.log(App)

const routes = [
  {
    path: '/',
    component: App,
    key: 'app',
    exact: false,
    children: [{
      path: '/app/table',
      component: () => <div>231312321</div>,
      key: 'default',
      exact: true
    }, {
      path: '/app/introduce',
      component: () => <div>11111</div>,
      key: 'introduce',
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
