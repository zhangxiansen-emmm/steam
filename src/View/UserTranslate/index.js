import React, { createContext } from 'react'
import { useReducer, useDispatch, useSelector } from 'react-redux'
import { Table, Row, Col, Space } from 'antd'
import { PlayCircleOutlined } from '@ant-design/icons'
import getAudio from '@getAudio'
import './index.less'
// const [state, dispatch] = useReducer(Store, [])
// console.log(state,'state')


export default (props) => {
    const AudioData = useSelector(state => state.AudioData)
    const musicList = (item) => {
        console.log(item)
        const switchPlay = () =>{
            
        }
        return (
            <Row type='flex' align='middle' key={item.id} data-key={item.id} onClick={switchPlay} className='musicItem'>
                <Col span={8}>{item.name}</Col>
                <Col span={4}>
                    <Space size={'size'}>{item.artists.map(songsInfo => (<span key={songsInfo.name}>{songsInfo.name}</span>))}</Space>
                </Col>
                <Col span={6} className='musicItem_Icon'>
                    <PlayCircleOutlined />
                </Col>
            </Row>
        )
    }
    return (
        <div>
            {AudioData.map(musicList)}
        </div>
    )
}
