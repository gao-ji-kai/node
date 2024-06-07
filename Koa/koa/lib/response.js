

module.exports = {
    //设置状态码
    set status(code) {
        this.res.statusCode = code;
    },
    //设置状态信息
    set msessage(msg) {
        // 给响应状态码的原因赋值
        this.res.statusMessage = msg;
    },
    // 设置响应体
    set body(val) {
        // 当调用 res.body = 'xxx' 时，会把 xxx 赋值给 this._body 可以赋值多次 但是只有最后一次有效
        this._body = val;
    },
    // 获取响应体
    get body() {
        return this._body;
    },
    //设置响应头
    set(key, value) {
        // 调用原生的setHeader方法设置响应头
        this.res.setHeader(key, value);
    }

}