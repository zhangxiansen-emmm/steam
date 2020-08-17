import { get, set, remove } from 'js-cookie';
import { notification } from 'antd'

const getCookie =  (key) => {
    let state = null;
    if (get(key)) {
        state = get(key)
    }
    return JSON.parse(state)
};
const setCookie =  (key, value, timer) => {
    return set(key, JSON.stringify(value), { expires: timer })
}
const removeCookie =  (key) => {
    let type = 'success'
    let option = {
        success: {
            message: '删除成功'
        },
        error: {
            message: '删除失败'
        }
    }
    try {
        remove(key)
    } catch (e) {
         type = 'error'
    }
    return  notification[type](option[type])
}

export {
    getCookie, setCookie, removeCookie
}