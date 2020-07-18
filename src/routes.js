import Login from '@View/Login'
import App from '@View/Index'

const routes = [
  // {
  //   path: '/app',
  //   component: App,
  // },
  {
    path: '/places/login',
    component: Login,
    exact: true,
    key:'login'
  },
]

export default routes
