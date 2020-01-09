const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const koa = new Koa()

koa.use(bodyParser())

koa.use(async function (ctx) {
  if (ctx.method === 'GET') {

    let html = ''

    html += `
    <form action="/" method="POST">
    <p>username</p>
    <input type="text" name="username"/>
    <p>username2</p>
    <input type="text" name="username"/>
    <p>password</p>
    <input type="text" name="password"/>
    <button type="submit">提交</button>
    </form>
    
    `


    ctx.body = html
  } else {
  
    ctx.body = ctx.request.body
  }
})




koa.listen(30001)