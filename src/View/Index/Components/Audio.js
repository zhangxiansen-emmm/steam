import React from 'react'
import store from '../../../redux/store'
export default class extends React.Component {
    constructor(props) {
        super()

    }

    async UNSAFE_componentWillMount() {


    }
    componentDidMount() {
        this.refs.audio.ontimeupdate = this.getCurrentTimer
    }
    // 获取音频播放时间
    getCurrentTimer(timer, b, c) {
        console.log(timer.target.currentTime, 'timer');
    }

    render() {
        const playdUrl = store.getState().playMusicUrl
        return <audio
            // preload="auto"
            ref="audio"
            src={playdUrl}
            // play={this.state.play}
            autoPlay={true}
            controls
            style={{ display: "block", width: '100%', height: 100 }}
        ></audio>
    }
}
