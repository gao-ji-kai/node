const fs = require('fs');// file system 最好使用绝对路径
const path = require('path');// 路径模块
const Promise = require('./promise.js');



let promise = new Promise((resolve, reject) => {
    resolve()
})
// 如果返回的是promise2 那么会涉及自己等自己的情况 
let promise2 = promise.then(() => { 
    return promise2
})
promise2.then(data => {
    console.log('外层', data);
}, err => {
    console.log('外层err', err);
})
