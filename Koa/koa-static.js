const { access } = require('fs/promises');
const { createReadStream } = require('fs');
const path = require('path');


module.exports = function (root) {
    return async (ctx, next) => {
        //先向后执行
        await next();
        //判断后面的执行有没有赋值给响应体
        if (!!ctx.body) return;
        //如果没有赋值给响应体，就读取静态资源
        //获取请求路径
        const filename = path.join(root, ctx.path);
        // 判断文件是否存在
        if (await exists(filename)) {
            ctx.set('Content-Type', 'text/html;charset=utf-8')
            //如果存在就读取文件
            ctx.body = createReadStream(filename);
        }
    }
}
// 判断文件是否存在
async function exists(path) {
    try {
        // access方法是异步的，所以用await 用来判断路径上的文件是否可以访问
        await access(path)
        return true
    } catch (e) {
        return false
    }
}