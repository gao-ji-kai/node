// 导入Koa模块
const Koa = require('./koa');
// 创建Koa实例
const app = new Koa();

// 使用中间件处理函数
app.use((ctx) => {//ctx是上下文对象 context对象  封装了很多原生Node.js的请求和响应对象 提供了语法糖 方便我们操作
    console.log('ctx:', ctx);

    // end 表示写入响应体内容并结束响应
    ctx.res.end('ok')// Nodejs原生的response对象

})

// 启动一个http服务 监听3000端口 
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
