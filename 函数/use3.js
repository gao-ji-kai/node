const fs = require('fs');// file system 最好使用绝对路径
const path = require('path');// 路径模块
const Promise = require('../Promise/promise.js');



let promise = new Promise((resolve, reject) => {
    resolve()
})
// 如果返回的是promise2 那么会涉及自己等自己的情况 不允许返回的值是自己
let promise2 = promise.then(() => { 
    return promise2
})
promise2.then(data => {
    console.log('外层', data);
}, err => {
    console.log('外层err', err);
})


// (2) 取值时报错
let obj = {}
Object.defineProperty(obj, 'then', {
    get() {
        throw new Error('getter')
    }
})
obj.then // 会报错
