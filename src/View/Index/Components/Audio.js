import React, { createRef } from 'react'
import { message } from 'antd'
import store from '../../../redux/store'
import './index.less'
export default class extends React.Component {
    constructor(props) {
        super()
        const clickSetsFontSize = [
            {
                text: 'Big',
                className: '',
                onClick: this.setFont.bind(this, 'Big')
            },
            {
                text: 'Default',
                className: '',
                onClick: this.setFont.bind(this, 'Default')
            },
            {
                text: 'Smaill',
                className: '',
                onClick: this.setFont.bind(this, 'Smaill')
            }
        ]
        this.state = {
            englist: [],
            index: 0,
            clickSetsFontSize,
            fontSize: ''
        }
        this.audio = createRef()
    }

    async UNSAFE_componentWillMount() {
        console.log(this.props);
    }
    componentDidMount() {
        this.audio.current.ontimeupdate = this.getCurrentTimer.bind(this)
        this.audio.current.onplay = this.playing.bind(this)
    }
    // 获取音频播放时间
    getCurrentTimer(timer, e) {
        this.todoLineHeigh(timer.target.currentTime)
    }
    // 设置歌词大小
    setFont(fontSize) {
        const { clickSetsFontSize } = this.state
        this.setState(() => ({
            fontSize,
            clickSetsFontSize: clickSetsFontSize.map(item => {
                item.className = ''
                item.className = item.text === fontSize && 'actived' || ''
                return item
            })
        }))
    }
    // 开始播放音乐
    async playing() {
        this.props.getSongsInfo({ type: 'songsInfo', value: this.props.getSongId() })
        const { lrc, tlyric } = await store.getState().songsInfo
        try {
            if (!lrc && !lrc.length) {
                throw ('请先搜索歌曲')
            }
            let [englist, chinese] = [lrc.lyric.split('\n'), tlyric.lyric.split('\n')]
            englist = englist.map((item, index) => {
                const params = new Object()
                const lyric = item.split(']')
                const t = lyric[0].slice(1);
                const timer = (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(3)
                Object.assign(params, {
                    timer,
                    lyric: lyric[1],
                    uid: index
                })
                return params
            })

            this.setState(() => ({ englist, index: 0 }))
        } catch (e) {
            message.error(e)
        }
    }

    // 设置歌词高亮
    todoLineHeigh(timer) {
        let { index, englist } = this.state
        if (timer >= parseFloat(englist[index].timer)) {
            this.setState(() => {
                return {
                    index: index + 1
                }
            })
        }
    }

    render() {
        const playdUrl = store.getState().playMusicUrl
        const { englist, index, clickSetsFontSize } = this.state
        return (
            <div>
                <audio
                    // preload="auto"
                    ref={this.audio}
                    src={playdUrl}
                    // play={this.state.play}
                    autoPlay={true}
                    controls
                    style={{ display: "block", width: '100%', height: 100 }}
                ></audio>
                <div className={`lyricWrapper`}>
                    <div className='setFont'>
                        {clickSetsFontSize.map((item, index) => (<div key={index} {...item}>{item.text}</div>))}
                    </div>
                    <div className={`lyric font${this.state.fontSize || ''}`}>
                        {englist.length && englist[index].lyric || ''}
                    </div>
                </div>
            </div>
        )
    }
}
