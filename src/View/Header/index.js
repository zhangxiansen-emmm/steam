import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { Row, Col } from 'antd'
import './index.less'


export default class haders extends Component {
  constructor(props) {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className='h_title'>头部</div>
    )
  }
}