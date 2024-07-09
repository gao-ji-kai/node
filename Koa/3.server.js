// 导入Koa模块
const Koa = require('koa');
const path = require('path');
// 导入koa-static模块
const static = require('./koa-static');
// 创建Koa实例
const app = new Koa();
// 使用koa-static中间件
app.use(static(path.join(__dirname, 'static')));


// 启动一个http服务 监听3000端口 
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});


