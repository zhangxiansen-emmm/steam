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
        path: '/app/default',
        component: () => <div>231312321</div>,
        key: 'default',
        exact: true
    },{
      path: '/app/userTranslate',
      component: () => <div>231312321</div>,
      key: 'userTranslate',
      exact: true
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
