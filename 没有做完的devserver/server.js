const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const config = require('./webpack.config.js');

let server = http.createServer();

server.on('request', (req, res) => {
    let urlObj = url.parse(req.url); // 获取请求url,并解析
    let urlPathname = urlObj.pathname;
    let filePathname = path.join(`${__dirname}/dist`, urlPathname);// 目标文件的完整路径
    if (urlPathname === '/index.html' || urlPathname === '/bundle.js') { //如果请求的资源存在(这里我偷懒就写死了)
        fs.readFile(filePathname, (err, data) => {
            webpack(config, () => { }); //先打包
            fs.readFile(filePathname, (err, data) => {// 最后把打包后的文件传给用户端
                res.writeHead(200);
                res.end(data)
            })
        })
    } else {
        res.writeHead(404);
        res.end('Not found!')
    }
})

server.listen(3000, () => {
    console.log('running......');
})

//只能做到每次更改文件后手动刷新，自动打包并显示新内容。没把热重载的效果做出来，对不起!!!