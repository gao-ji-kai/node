const http = require('http');

// node中的主线程是单线程  请求来了后 会处理请求 后面的请求 要等待前面的处理完毕后 才能得到处理

// 创建一个http服务  req:请求对象  res:响应对象
const server = http.createServer((req, res) => {
    res.end('hello world');
});
let port = 8080;
// 监听端口
server.listen(port, () => {
    console.log('服务启动成功');
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {// 端口被占用
        ++ port 
        
    }
    console.log('服务启动失败', err);
 })


// 服务启动成功后 会一直监听端口  直到手动关闭服务 本地开发一般采用nodemon来监听文件变化 重启服务
// 上线的时候 会采用pm2来管理服务 保证服务的稳定性
// 文件保存后 可以自动重启
