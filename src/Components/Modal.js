import React, { useState } from 'react'
import { Button } from 'antd'
import './Modal.less'
import { CloseOutlined } from '@ant-design/icons'

const render = (props) => {
    const onShowModal = () =>{
        props.onOk()
    }   
    const onHideModal = () =>{
        props.onCencel()
    }
    return (
           
                    <div className='React-Modal-Context'>
                        { props.visible ? (
                        <div className='React-Modal-Mask'>
                            <div className='React-Modal-Content'>
                                <div className='React-Modal-Header'>
                                    头部
                                    <span> <CloseOutlined /> </span>
                                </div>
                                <div className='React-Modal-Body'>
                                    {props.children}
                                body
                                </div>
                                { props.footer === undefined || props.footer   ? <div className='React-Modal-Footer'>
                                    <Button>返回</Button>
                                </div> : null}
                            </div>
                        </div>
                         ) : null
                        }
                    </div>
           
    )
}


export default render