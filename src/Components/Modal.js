import React, { useState, Component } from 'react'
import { Button, Divider } from 'antd'
import './Modal.less'
import { CloseOutlined } from '@ant-design/icons'

class Modal extends Component {
    constructor(props) {
        super();
        this.state = {}
    }

    onShowModal = () => {
        this.props.onOk()
    }
    onHideModal = ($e) => {
        this.props.onCencel()
        $e.preventDefault()
    }

    down = function ($e) {
        $e.stopPropagation()
        const { x, y, clickX, clickY } = this.getPostion($e)
        this.setState({
            x, y, clickX, clickY
        })
        window.onmousemove = this.mouseMove
    }

    mouseMove = (e) => {
        //按下当前元素里坐标
        let { pageX, pageY } = this.getPostion(e)

        this.setState({
            moveX: pageX - this.state.clickX,
            moveY: pageY - this.state.clickY
        })
        console.log(pageX, pageY)
    }

    up = () => {
        window.onmousemove = null
        console.log(window.onmousemove)
        return false
    }

    getPostion = (e) => {
        const [dom] = [e.target];
        //获取header坐标
        const { left: x, top: y } = dom.getBoundingClientRect()
        let [clickX, clickY] = [0, 0]
        const { pageX, pageY } = e
        clickX = pageX - x
        clickY = pageY - y
        return {
            x, y, pageX, pageY, clickX, clickY
        }
    }




    render() {
        let { moveX: left, moveY: top } = this.state
        const { props } = this
        const styles = { left, top, cursor: props.drag ? 'move' : 'none' }
        return (
            <div>
                <div className='React-Modal-Context' >
                    {this.props.visible ? (
                        <div className='React-Modal-Mask' onClick={this.onHideModal.bind(this)} ></div>) : null
                    }

                </div>
                { this.props.visible ? (<div className='React-Modal-Content' style={styles} id='Modal' ref='modal'>
                    <div className='React-Modal-Header' onMouseUp={this.up.bind(this)} onMouseDown={props.drag && this.down.bind(this)}>
                        {props.title || '头部'}
                        <span> <CloseOutlined onClick={this.onHideModal.bind(this)} /> </span>
                    </div>
                    <div className='React-Modal-Body'>
                        {props.children}
                                    body
                                </div>
                    { props.footer === undefined || props.footer ? <div className='React-Modal-Footer'>
                        <Button onClick={this.onHideModal.bind(this)}>返回</Button>
                    </div> : null}

                </div>
                ) : null
                }
            </div>



        )
    }
}







Object.assign(Modal, {
    confirm: function (options) {
        console.log(123213)
    }
})

export default Modal
