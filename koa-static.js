const Koa = require('koa')
const Static = require('koa-static')
const path = require('path')

const app = new Koa()

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

app.use(Static(
  path.join( __dirname,  staticPath)
))

app.listen(30001)