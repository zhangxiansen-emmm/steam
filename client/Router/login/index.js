const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const sequelize = require('@sequelize')
const router = new Router()


router.post('/login', async (ctx) => {
  console.log(ctx,'login')
  const params = ctx.request.body
  const secretOrPrivateKey = 'zhangxiansen'
  const token = await jwt.sign(params, secretOrPrivateKey)
  ctx.body = await token
  params.token = token
  const config = await userModal.create(params).then(
    (res) => res,
    (err) => err
  )
  await next()
  ctx.body = await config
})

module.exports = router
