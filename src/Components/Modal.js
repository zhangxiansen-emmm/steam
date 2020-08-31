import React from 'react'
import { Modal } from 'antd'


const render = (props) => {
   
    return (
        <Modal
            destroyOnClose
            visible={props.visible}
            onOk={props.onOk}
            onCancel={props.onCancel}
            title={props.title}
        >
            {props.children}
        </Modal>
    )
}


export default render