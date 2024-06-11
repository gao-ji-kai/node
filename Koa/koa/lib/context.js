
// 设置代理
const { on } = require('koa');
const delegate = require('./delegates');
// 创建一个空对象 并将其导出
const proto = module.exports = {
    onerror(err) {
        const { res } = this;
        this.status = 500;
        this.res.end(err.message || 'Internal error');
    }
};
// 代理request对象的方法 链式调用  会返回自己的实例
delegate(proto, 'request')// access是既可以读又可以写  getter是只读 method是方法
    .access('method')// 将request.method代理到proto对象上
    .access('url')
    .access('path')
    .access('query')
    .getter('header');

// 代理response对象的方法 
delegate(proto, 'response')
    .access('status')
    .access('message')
    .access('body')
    .access('type')
    .method('set');// 代理response.set方法
