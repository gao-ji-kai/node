// 导入Koa模块
const Koa = require('koa');
// 创建Koa实例
const app = new Koa();

// 使用中间件处理函数
app.use((ctx) => {//ctx是上下文对象 context对象  封装了很多原生Node.js的请求和响应对象 提供了语法糖 方便我们操作
    // 请求方法
    console.log(ctx.request.method);
    // 请求URL地址  http://localhost:3000/xxx/id=1
    console.log(ctx.request.url);
    // 请求路径
    console.log(ctx.request.path);
    // 请求查询参数
    console.log(ctx.request.query);
    // 请求头
    console.log(ctx.request.headers);

    // 响应状态码
    ctx.response.status = 200;
    // 响应类型
    ctx.response.type = 'text/html';
    // 响应体内容
    ctx.response.message = '<h1>hello koa</h1>';
})

// 启动一个http服务 监听3000端口 
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
