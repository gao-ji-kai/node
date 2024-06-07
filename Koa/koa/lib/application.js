const http = require('http');
const request = require('./request');
const response = require('./response');

class Application {
    constructor() {
        this.request = Object.create(request);
        this.response = Object.create(response);
    }
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
            const ctx = this.createContext(req, res);
            // 调用中间件处理函数
           this.middleware(ctx);
           // 取出ctx.body的值 并写入响应体
           return res.end(ctx.response.body);
        }
        return handleRequest;
    }
    createContext(req,res) {
        const context = { req, res };
        // 需要保证每次请求到来时  每个context都是新的 互不影响
        const request = context.request = Object.create(this.request);//相当一继承 __proto__指向request
        const response = context.response = Object.create(this.response);
        // 让封装后的request和response对象拥有对原生req和res的引用
        request.req =req;
        response.res = res;
        return context;
    }
}
module.exports = Application;