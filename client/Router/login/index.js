const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const { userModal } = require('@Modale')
const router = new Router()

console.log(userModal,'use')

router.post('/login', async (ctx, next) => {
  const params = ctx.request.body
  const secretOrPrivateKey = 'zhangxiansen'
  const token = await jwt.sign(params, secretOrPrivateKey)
  // ctx.body = await token
  params.token = token
  console.log(params)
  const config = await userModal.create(params).then(
    (res) => res,
    (err) => err
  )
  await next()
  ctx.body = await config
})

module.exports = router
