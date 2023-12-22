const fs = require('fs');// file system 最好使用绝对路径
const path = require('path');// 路径模块
const Promise = require('./promise.js');

// fs.readFile(path.resolve(__dirname, 'name.txt'), 'utf8', function (err, data) {
//     if (err) return console.log(err);
//     fs.readFile(path.resolve(__dirname, data), 'utf8', function (err, data) {
//         if (err) return console.log(err);
//         console.log('data', data);
//     })
// })

function readFile(url) {
    return new Promise((resolve, reject) => {
        fs.readFile(url, 'utf8', function (err, data) {
            if (err) return reject(err);
            resolve(data)
        })
    })
}

/*
    promise的链式调用
        (1)每次返回的是一个普通值(非promise的值)这个值会被传到外层then的下一个then中
        (2)没有返回值(抛异常了)会走到外层then的错误处理中
        (3)返回的是promise，会去解析返回的promise，会采用他的状态，如果成功会将成功的结果向外层的下一个then传递

    什么时候会失败 
        1.抛异常会走下一次的失败 
        2.返回的是失败的promise
        其他都成功

    链式调用一般情况都是返回this
    Promise为了能够扭转状态  而且还要保证Promise状态变化后不可以更改。解决办法:返回一个新的Promise
*/
let promise2 = readFile(path.resolve(__dirname, 'name.txt')).then((data) => {
    // return false
    // throw new Error('error')
    // return readFile(path.resolve(__dirname, data))
    return new Promise((resolve, reject) => {
        resolve(100)
     })  //决定外层then的状态  决定promise2是成功还是失败
})
promise2.then(data => {
    console.log('外层', data);
}, err => {
    console.log('外层err', err);
})
