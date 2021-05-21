import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { getCookie, removeCookie, setCookie } from '@utils/cookie'
import proxyAudio from '../../getAudio'
// import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'

// const composeEnhancers = composeWithDevTools({
// options like actionSanitizer, stateSanitizer
// })
const Store = (state = false, actions) => {
    const { type } = actions
    switch (type) {
        case 'USERNAME':
            return (state = true)
        default:
            return state
    }
}
const isLogin = (state = false, actions) => {
    const { type, value } = actions
    switch (type) {
        case 'login:out':
            removeCookie('isLogin')
            removeCookie('token')
            state = value
            break
        case 'login':
            state = value
            setCookie('isLogin', true)
            break
    }
    return getCookie('isLogin') || false
}

const clickMenu = (state = [], actions) => {
    const { type, value } = actions
    switch (type) {
        case 'clickMenu':
            state.push(value)
            return state
        default:
            return state
    }
}
const songId = (state = 0, actions) => {
    const { type, value } = actions
    switch (type) {
        case 'setSongId':
            state = value
            return state;
        case 'getSongId':
            return state
        default:
            return state
    }

}
const songsInfo = async (state = {}, actions) => {
    const { type, value } = actions;
    if (type === 'songsInfo') {
        state = await proxyAudio.get('/lyric', { params: { id: value } })
        return state
    }
    return state
}

const songUrl = (state = '', actions) => {
    const { type, value } = actions
    if (type === 'getSongUrl') {
        const params = Object.assign(value)
        proxyAudio.post('/song/url', params).then((res) => {
            console.log(res)
            state = res
        })
        return state
    }
    return state
}

const AudioData = (state = [], actions) => {
    const { type, value } = actions
    switch (type) {
        case 'setAudioData':
            state = value
            return state
        case 'getAudioData':
            return state
        default:
            return state
    }
}




const playMusicUrl = (state = '', actions) => {
    const { type, value } = actions
    switch (type) {
        case 'setMusic':
            state = value;
            return state
        case 'getMusic':
            return state
        default:
            return state
    }
}


export default createStore(
    combineReducers({
        Store,
        isLogin,
        clickMenu,
        songUrl,
        AudioData,
        playMusicUrl,
        songId,
        songsInfo
    }),
    applyMiddleware(thunk, logger)
);
