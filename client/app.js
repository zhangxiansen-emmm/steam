const koa = require('koa')
require('module-alias/register')  
const app = new koa()
const bodyparser = require('koa-bodyparser')
const qs = require('qs')
const readFile = require('./Router')
const { sequelize, userModal } = require('./sequelize')
app.use(bodyparser())





app.use(async (ctx, next) => {
  const { url, header } = await ctx.request
  if (url === '/login') {
    await next()
    return
  }

  if (header.token) {
    const [token, userId] = await header.token.split('&')
    const config = await userModal.findAll({
      where: {
        userId,
        token,
      },  
    })
    if (!config) return
    await next()
  }
})



app.use(readFile())


app.listen(4430, () => {
  console.log('已启动')
})
