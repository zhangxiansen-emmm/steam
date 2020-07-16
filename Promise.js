
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'


class AsyncPromise {
  constructor(callback) {
    this.status = ''
    this.value = ''
    this.reason = ''

    let resolve = (data) => {
      this.status = PENDING
      this.value = data
      return
    }
    let reject = (data) => {
      this.status = REJECTED
      this.reason = data
      return
    }
    callback(resolve, reject)
  }

  then(res, rej = () => { }) {
    if (this.status === PENDING) {
      res(this.value)
      return
    }
    rej(this.reason)
  }
}

new Promise((resolve)=>{
  console.log(2)
  resolve(1)
  console.log(2)
})

new AsyncPromise((resolve, reject) => {
  resolve(1)
  reject(2)
}).then(res => {
  console.log(res)
})