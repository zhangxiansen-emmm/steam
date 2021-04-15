import React, { createContext } from 'react'
import { useReducer, useDispatch, useSelector } from 'react-redux'
import { Table, Row, Col, Space } from 'antd'
import { PlayCircleOutlined } from '@ant-design/icons'
import getAudio from '@getAudio'
import './index.less'

export default (props) => {
    const AudioData = useSelector(state => state.AudioData)
    console.log(AudioData);
    const musicList = (item) => {
        const playing = () => {
                
        }
        const switchPlay = () =>{
            
        }
        return (
            <Row type='flex' align='middle' key={item.id} data-key={item.id} onClick={switchPlay} className='musicItem'>
                <Col span={8}>{item.name}</Col>
                <Col span={6}>
                    <Space size={'size'}>{item.artists.map((songsInfo, index) => (<span className='songName' key={songsInfo.name}>{songsInfo.name}{index === item.artists.length - 1 ? '' : ' / '}</span>))}</Space>
                </Col>
                <Col span={6} className='musicItem_Icon'>
                    <PlayCircleOutlined onClick={playing}/>
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
