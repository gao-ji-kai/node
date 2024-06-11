const http = require('http');
const request = require('./request');
const response = require('./response');
const context = require('./context');
const compose = require('./koa-compose');

class Application {
    constructor() {
        // 创建一个新的request对象，这个对象继承自自定义的request模块
        this.request = Object.create(request);
        // 创建一个新的response对象，这个对象继承自自定义的response模块
        this.response = Object.create(response);
        // 创建一个新的context对象，这个对象继承自自定义的context模块
        this.context = Object.create(context);

        // 中间件处理函数
        this.middleware = [];   // 用来存放中间件 多个
    }
    // 使用一个请求处理函数 
    use(fn) {
        // 先将fn暂存起来  等到listen的时候再执行
        // 设置中间件处理函数
        this.middleware.push(fn);
        return this;
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
        // 通过compose函数将中间件合并成一个函数
        const fn = compose(this.middleware);
        const handleRequest = (req, res) => {
            // 创建一个上下文对象
            const ctx = this.createContext(req, res);
            return this.handleRequest(ctx, fn);// 传入上下文对象和中间件函数

        }
        return handleRequest;
    }
    handleRequest(ctx, fnMiddleware) {
        // 将fnMiddleware函数执行后的结果返回给fnMiddleware函数
        const handleResponse = () => respond(ctx);
        // 错误处理函数
        const onerror = err => ctx.onerror(err);
        return fnMiddleware(ctx).then(handleResponse).catch(onerror);

    }

    createContext(req, res) {
        const context = Object.create(this.context); //相当一继承 __proto__指向context
        // 需要保证每次请求到来时  每个context都是新的 互不影响
        const request = context.request = Object.create(this.request);//相当一继承 __proto__指向request
        const response = context.response = Object.create(this.response);
        // 让封装后的request和response对象拥有对原生req和res的引用
        request.req = context.req = req;
        response.res = context.res = res;
        return context;
    }
}
function respond(ctx) {
    let res = ctx.res
    let body = ctx.body;
    return res.end(body);

}
module.exports = Application;