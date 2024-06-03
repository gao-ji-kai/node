const http = require('http');
const url = require('url');

// node中的主线程是单线程  请求来了后 会处理请求 后面的请求 要等待前面的处理完毕后 才能得到处理

console.log(url.parse('http://username:password@localhost:8080/a?name=1#hash'));
/*
Url {
  protocol: 'http:',
  slashes: true,
  auth: 'username:password',
  host: 'localhost:8080',
  port: '8080',
  hostname: 'localhost',
  hash: '#hash',
  search: '?name=1',
  query: 'name=1',
  pathname: '/a',
  path: '/a?name=1',
  href: 'http://username:password@localhost:8080/a?name=1#hash'
}
 */

// 创建一个http服务  req:请求对象  res:响应对象
const server = http.createServer((req, res) => {
    // 解析请求参数 http模块是基于net模块的  他会增加 header来

    // http模块是基于net模块的  会将接收到的数据进行存储  通过req对象来获取
    console.log(req.method); // 请求方法 方法名字都是大写的 GET
    const { pathname, query } = url.parse(req.url, true); // 将url转化为对象 
    console.log(pathname, query); //a [Object: null prototype] { name: '1' }
    console.log(req.url); // 请求路径 不包含哈希值
    console.log(req.httpVersion); // http版本号 1.1

    console.log(req.headers)

    const arr = []
    req.on('data', (chunk) => {  // 如果有请求体 会触发data事件
        arr.push(chunk);
    });
    req.on('end', () => { // 请求结束后触发
        console.log(Buffer.concat(arr).toString(), 'end');
    });

    if (pathname === '/a') {// 根据不同的路径返回不同的内容 在node中这种代码可以通过子进程转换成进程间的通信来进行处理，不应该放在主进程中 会阻塞
        let sum = 0
        for (let i = 0; i < 1000000000; i++) {
            sum += i
        }
        res.end(sum + '');
    } else {
        res.end('404');
    }

    /*
        1.请求行
            请求方式 请求地址 请求协议/版本  GET / xxx http/1.1
                请求方法 restful风格  根据请求方法的不同 服务器做不同的处理操作
                    GET 获取数据
                    POST 提交数据
                    PUT 修改数据
                    DELETE 删除数据
                    OPTIONS 预检请求 用于解决跨域问题 (如果增加了自定义的header 会先发送一个options请求 询问服务器是否支持该请求)
                    HEAD 获取响应头
                    TRACE 测试
                    CONNECT 连接
                    PATCH 修改部分数
            console.log(req.method); // 请求方法 方法名字都是大写的
            console.log(req.url); // 请求路径 不包含哈希值
            路径 http://localhost:8080/a?name=1#hash
            console.log(req.httpVersion); // http版本号
        2.请求头
            console.log(req.headers); node 中将header的key全部转化为小写
            

        3.请求体
             req.on('data', (chunk) => {  // 如果有请求体 会触发data事件
                arr.push(chunk);
                });
            req.on('end', () => { // 请求结束后触发
                console.log(Buffer.concat(arr).toString(), 'end');
                })
        
        4.响应
            4.1 响应行
                res.statusCode = 200; // 状态码 由服务端来设置 可以随意设置 一般都是按照浏览器的标准来设置
                    常见状态码
                        1xx 信息类 100 101(webSocket) 102
                        2xx 成功 200(成功) 204(成功了 但没响应体) 206(分段传输、拿到内容的部分数据)
                        3xx 重定向 301(永久重定向) 302(临时重定向) 304(缓存相关 协商缓存)
                        4xx 客户端错误 400(请求错误 参数有问题) 401(未授权、权限不够) 403(禁止访问 登录了 没权限) 404(找不到页面) 405(方法不允许)
                        5xx 服务端错误 500(服务端错误) 502(网关错误) 503(服务端过载) 504(网关超时)
                        也可以自定义 如 666  777  

                

            4.2响应头
                res.setHeader('Content-Type', 'text/plain;charset=utf-8'); // 设置响应头

            4.2响应体


       favicon.ico  浏览器会默认请求这个文件  一般是网站的logo
     */

});
let port = process.env.port || 8080;
// 监听端口
server.listen(port, () => {
    console.log('服务启动成功' + port);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {// 端口被占用 自动端口+1
        server.listen(++port);
    }
})

// 服务启动成功后 会一直监听端口  直到手动关闭服务 本地开发一般采用nodemon来监听文件变化 重启服务
// 上线的时候 会采用pm2来管理服务 保证服务的稳定性
// 文件保存后 可以自动重启

// 每个系统有对应的设置环境变量的方式  cross-env  可以跨平台设置环境变量 npm install cross-env -D



