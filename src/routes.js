import React from 'react'

const routes = [
  {
    path: '',
    component: React.lazy(import('@View/Index')) ,
    exact:true
  },{
    path: '',
    component: React.lazy(import('@View/Index')),
    exact:true
  },{
    path: '',
    component: React.lazy(import('@View/Index')),
    exact:true
  }
]