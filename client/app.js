const koa = require('koa')
const Router = require('koa-router')
const app = new koa()
const router = new Router()
const bodyparser = require('koa-bodyparser')
const jwt = require('jsonwebtoken')
const qs = require('qs')
const { sequelize, userModal } = require('./sequelize')

app.use(bodyparser())
app.use(async (ctx, next) => {
  const { url, header } = await ctx.request
  if (url === '/login') {
    next()
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

router.post('/login', async (ctx, val) => {
  const params = ctx.request.body;
  
  ctx.body = 1
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(4430, () => {
  console.log('已启动')
})
