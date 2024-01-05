// 可以将一些异步的方法转换成promise的方法


// ECMAScript 为了更方便 还提供了以下方法

const fs = require('fs/promises');
const path = require('path');
const util = require('util');// node中的工具方法


function promisify(fn) {// 高阶函数
    return function (...args) {
        return new Promise((resolve, reject) => {
            fn(...args, function (err, data) {
                if (err) return reject(err)
                resolve(data)
            })
        })
    }
}
// 转化对象中所有的api
function promisifyAll(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'function') {
            obj[key] = promisify(obj[key])
        }
    }
}

// 只针对node  node中函数参数第一个永远是err 基于这个特点可以将node中的方法转化成promise方法
// let readFile = promisifyAll(fs)
fs.readFile(path.resolve(__dirname, 'name.txt'), 'utf8').then(data => {
    console.log('data', data);
}).catch(err => {
    console.log('err', err);
})


