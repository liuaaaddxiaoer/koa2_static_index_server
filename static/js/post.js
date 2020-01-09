const Koa = require('koa')





const koa = new Koa()


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
    
    // let data = await bodyParse(ctx)

    ctx.body = 22
  }
})


function bodyParse(ctx) {
   return new Promise((resolve, reject) => {
    let body = ''
    ctx.req.addListener('data', (data) => {
      console.log(data)
      body +=data
    })
    ctx.req.addListener('end', () => {
      console.log(body)
      resolve(jsonParse(body))
    })
   })
}

function jsonParse(data) {
  let json = {}
  let querys = data.split('&')
  for(let [index, item] of querys.entries()) {
    let values = item.split('=')
    json[values[0]] = values[1]
  }
  return json
}

koa.listen(30001)