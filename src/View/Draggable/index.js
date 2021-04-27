// 首先是需要一个组件库
// 使用一个元素模拟b端页面
// 然后可以点击并且可以拖拽
import React, { useState } from "react";
import Antd , { Row,Col } from 'antd'
import ComponentLibrary from "@Components/ComponentLibrary";
import './index.less'

export default () => {
    console.log(Antd,'21321321')

    const [target,setTarget] = useState(null)
    const [[left,right],setPos] = useState([])


    const AppContainer = () => {
      return <div className='AppContainer'></div>
    }

    const keyDown = (e) =>{
      setTarget(e.target)

    }
    const keyUp = (e) => {
        target.onmousemove = null
        return 
    }
  return (
    <Row className="capture" onMouseDown={keyDown} onMouseUp={keyUp}>
      <Col span={11} className="capture">
        <AppContainer />
      </Col>
      <Col span={11} className="capture">
        <ComponentLibrary />
      </Col>
    </Row>
  );
}


