
// 无论成功还是失败都会走到finally中

const { call } = require("function-bind");


// 实现
Promise.prototype.finally = function (callback) {
    return this.then((value) => {
        return Promise.resolve(callback()).then(() => value)
    }, (r) => {
        return Promise.resolve(callback()).then(() => { throw r })
    })
}



Promise.reject().finally(() => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ok')
        }, 1000);
    })
}).then(data => {
    console.log('data', data);
}).catch((err) => {
    console.log('失败', err);
})