import React, { createContext } from "react";
import { useReducer, useDispatch, useSelector, Provider } from "react-redux";
import { Table, Row, Col, Space } from 'antd'
import { PlayCircleOutlined } from '@ant-design/icons'
import getAudio from '@getAudio'
import './index.less'
import store from "../../redux/store";
console.log(store);
export default (props) => {
    const dispatch = useDispatch();
    const AudioData = useSelector(state => state.AudioData)
    const musicList = (item) => {
        const playing = (item) => {
            getAudio
                .get("/song/url", {
                    params: {
                        id: item.id,
                    },
                })
                .then((res) => {
                    dispatch({ type: 'setSongId', value: item.id })
                    dispatch({ type: "setMusic", value: res.data[0].url });
                });

        }
        return (
            <Row type='flex' align='middle' key={item.id} data-key={item.id} className='musicItem'>
                <Col span={8}>{item.name}</Col>
                <Col span={6}>
                    <Space size={'size'}>{item.artists.map((songsInfo, index) => (<span className='songName' key={songsInfo.name}>{songsInfo.name}{index === item.artists.length - 1 ? '' : ' / '}</span>))}</Space>
                </Col>
                <Col span={6} className='musicItem_Icon'>
                    <PlayCircleOutlined onClick={() => playing(item)} />
                </Col>
            </Row>
        )
    }
    return <div>{AudioData.map(musicList)}</div>;
}
