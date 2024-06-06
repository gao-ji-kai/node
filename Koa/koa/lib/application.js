const http = require('http');

class Application {
    // 使用一个请求处理函数 
    use(fn) {
        // 先将fn暂存起来  等到listen的时候再执行
        this.middleware = fn;
    }
    // 将listen方法的实参变成一个数组保存到args数组中
    listen(...args) {
        // 创建一个http服务
        const server = http.createServer(this.callback());
        // 启动服务 把端口号和成功后的回调透传给http服务器
        server.listen(...args);
    }
    // 创建一个回调函数
    callback() {
       const handleRequest = (req, res) => {
            // 创建一个上下文对象
            const ctx = {
                req,
                res
            };
            // 调用中间件处理函数
            this.middleware(ctx);
        }
        return handleRequest;
    }
}
module.exports = Application;