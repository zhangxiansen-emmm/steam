const koa = require('koa')
const app = new koa()
const qs = require('qs')
const mysql = require('mysql')
const co = require('co-mysql')


const context = mysql.createPool({}) //数据库地址链接

app.context.db = co(context)













app.listen(4430, () => {
  console.log('已启动')
})
