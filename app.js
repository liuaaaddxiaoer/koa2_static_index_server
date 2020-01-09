const Koa = require('koa')
const Log = require('./middleware/log')
const fs = require('fs')
const app = new Koa()
app.use(Log())

const Router = require('koa-router')


const homeRouter = new Router()
homeRouter.get('/', async (ctx) => {
  ctx.body = {
    url: ctx.url,
    query: ctx.query,
    queryStr: ctx.querystring,
  }
})


const adminRouter = new Router()
adminRouter.get('/', async (ctx) => {
  ctx.body = 'admin'
})



const rootRouter = new Router()
rootRouter.use('/', homeRouter.routes(), homeRouter.allowedMethods())
rootRouter.use('/admin', adminRouter.routes(), adminRouter.allowedMethods())


// route
app
.use(rootRouter.routes())
.use(rootRouter.allowedMethods())




app.listen(3001)

console.log('listen 3001 port')




async function render(url) {
  return new Promise((resolve, reject) => {
    let path = `./view/${url}`
    fs.readFile(path, 'binary', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data.toString())
      }
    })
  })
}

async function route(url) {
  let html = ''
  switch(url) {
    case '/':
    case '/index.html':
      html = 'index.html'
      break;
    default:
      html = '404.html'
      break;
  }
  let htmlBody = await render(html)
  return htmlBody
}