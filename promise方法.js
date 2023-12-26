// ECMAScript 为了更方便 还提供了以下方法

const fs = require('fs');
const path = require('path');
const Promise = require('./promise');

/*
    1. 多个请求并发获取最终结果

*/

// Promise.all() 传入一个数组，数组中的每一项都是一个Promise实例 等待所有的promise都成功才成功  有一个失败就失败
function readFile(url) {
    // 延迟方法
    return new Promise((resolve, reject) => {
        fs.readFile(url, 'utf8', function (err, data) {
            if (err) return reject(err)
            resolve(data)
        })
    })
}

Promise.all([readFile(path.resolve(__dirname, 'name.txt')),
readFile(path.resolve(__dirname, 'age.txt'))]).then(data => {
    console.log('data', data);
}).catch(err => {
    console.log(err);
})

// Promise.race() 传入一个数组，数组中的每一项都是一个Promise实例 以最快的为准
Promise.race([readFile(path.resolve(__dirname, 'name.txt')),
readFile(path.resolve(__dirname, 'age.txt'))]).then(data => {
    console.log('data', data);
}).catch(err => {
    console.log(err);
})
