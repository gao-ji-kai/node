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
