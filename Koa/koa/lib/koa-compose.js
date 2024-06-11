
/**
 * 把中间件数组 组合成一个函数 异步串行 
 * @param {*} middleware 
 */
function compose(middleware) {
    return function (ctx) {
        function dispatch(i) {
            let fn = middleware[i];
            // 如果fn不存在 直接返回一个成功的promise
            if (!fn) {
                return Promise.resolve();
            }
            // 如果fn存在 就执行fn
            try {
                // 包装成promise对象
                return Promise.resolve(fn(ctx, () => dispatch(i + 1)));// 递归调用 保证中间件串行执行
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return dispatch(0);
    }

}
module.exports = compose;