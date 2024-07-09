// 导入Koa模块
const Koa = require('./koa');
// 创建Koa实例
const app = new Koa();

// 使用中间件
const middleware1 = async (ctx, next) => {//ctx:上下文对象 next:下一个中间件函数
    await next();//调用下一个中间件函数 只能写一次  写两个会报错
    //await next();Error: next() called multiple times
}
const middleware2 = async (ctx, next) => {//ctx:上下文对象 next:下一个中间件函数

}


// 打印结果 1 3 5 4 2 说明中间件是一个洋葱模型 从外到内再从内到外 依次执行
app.use(middleware1);
app.use(middleware2);


// 启动一个http服务 监听3000端口 
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});


