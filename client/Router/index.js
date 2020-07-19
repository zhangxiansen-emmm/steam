const Router = require('koa-router')
const compose = require('koa-compose')
const router = new Router()
const glob = require('glob')
const path = require('path')


const readFile = () => {
  const fileArray = []
  glob
    .sync(path.resolve(__dirname, './', '**/*.js'))
    .filter((item) => item.includes('.js') && !item.includes('Router/index.js'))
    .map((item) => {
      fileArray.push(require(item).routes())
      fileArray.push(require(item).allowedMethods())
    })
  return compose(fileArray)
}

module.exports = readFile
