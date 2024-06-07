const { get } = require('http');
const parse = require('parseurl');
const qs = require('querystring');

module.exports = {
    get url() {
        return this.req.url;
    },
    get path() {
        // 把url地址解析成对象 pathname是url的的路径名
        return parse(this.req).pathname;//解析url地址
    },
    get method() {
        return this.req.method
    },
    get queryString() {
        // 获取查询字符串
        return parse(this.req).query;
    },
    // 它会调用qs.parse()方法，将查询字符串转换为对象并返回
    get query() {
        return qs.parse(this.queryString);
    },
    // 获取请求头
    get headers() {
        return this.req.headers;
    },
    get header() {
        return this.req.headers;
    }
}