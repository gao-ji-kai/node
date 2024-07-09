// 导入Koa模块
const Koa = require('./koa');
const fs = require('fs');
// 创建Koa实例
const app = new Koa();


// 使用中间件
const middleware1 = async (ctx, next) => {//ctx:上下文对象 next:下一个中间件函数
    ctx.body = 'hello';//字符串
    ctx.body = Buffer.from('buffer');// 二进制Buffer对象
    ctx.body = fs.createReadStream('./package.json');//可读流
    ctx.body = { name: 'zhangsan' };// 普通js对象
}




app.use(middleware1);


// 启动一个http服务 监听3000端口 
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});


