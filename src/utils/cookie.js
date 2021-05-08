import { notification } from 'antd'
const getCookie = (key) => {
  let state = null
  if (localStorage.getItem(key)) {
    state = JSON.parse(localStorage.getItem(key))
  }
  return state
}
const setCookie = (key, value, timer) => {
  return localStorage.setItem(key, JSON.stringify(value))
}
const removeCookie = (key) => {
  let type = 'success'
  let option = {
    success: {
      message: '删除成功',
    },
    error: {
      message: '删除失败',
    },
  }
  try {
    localStorage.removeItem(key)
  } catch (e) {
    type = 'error'
  }
  return notification[type](option[type]) 
}

export { getCookie, setCookie, removeCookie }
