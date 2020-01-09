const Koa = require('koa')
const fs = require('fs')
const path = require('path')

const koa = new Koa()


koa.use(async function(ctx) {
  
  

  ctx.type = parseMines(ctx.url)


  console.log(ctx.type)
  ctx.body = static(ctx.url)
})


function static(url) {

  let abPath = path.join(path.resolve(__dirname, ''), url)

  let exist = fs.existsSync(abPath)
  console.log(abPath)

  let content = ''

  if (exist) {
    console.log(1)

    // 文件还是目录
    let stat = fs.statSync(abPath)
    if (stat.isDirectory()) {
      
      content = dir(abPath, url)

    } else {
      content = file(abPath)
    }
    return content

  } else {
    return 404
  }

}


function mimeParse(ext) {

  ext = ext.substr(1)
  console.log(1111)
  console.log(ext)

  let dict = {
    ico: 'image/x-icon',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    json: 'application/json',
    js: 'text/javascript',
    css: 'text/css',
    html: 'text/html',
    txt: 'text/plain',
    xml: 'text/xml',
    gif: 'image/gif',
    less: 'text/css',
    pdf: 'application/pdf',
  }
  return dict[ext] || 'application/octet-stream'
}

function parseMines(url) {

  let mime = ''

  let ext = path.extname(url)
  if (ext) {
    mime = mimeParse(ext)
  } else {
    mime = 'text/html'
  }
  return mime
}

function file(url) {
  let content = fs.readFileSync(url)
  return content
}

function dir(url, originalURL) {
  let files = fs.readdirSync(url)
  console.log('file is')
  console.log(files)
  console.log('file end')
  let html = '<ul>'
  files.forEach((value) => {
    html += `<li>`
    html += `<a href=${originalURL === '/' ? '/' : (originalURL + '/')}${value}>`
    html += value
    html += `</a>`
    html += `</li>`
  })
  html += '</ul>'

  return html
} 

koa.listen(30001)