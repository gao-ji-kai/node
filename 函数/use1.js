// Description: Promise的使用
/**

    1.Promise是一个类，使用时需要new Promise()来产生一个promise实例
    2.构造函数中需要传递一个参数 executor 执行器
    3.executor中有两个参数，分别是resolve和reject  resolve(value) reject(reason)
        调用resolve时，promise的状态会变成成功，调用reject时，promise的状态会变成失败
    4.promise有三种状态，分别是pending(等待)、fulfilled(成功)、rejected(失败)
    5.promise的状态只能从pending->fulfilled或者pending->rejected，状态一旦改变就不能再改变
    6.每个promise都有一个then方法，then方法中有两个参数，分别是成功的回调onFulfilled和失败的回调onRejected
    7.如果不调用resolve，此时promise不成功也不失败 （如果发生异常  也认为是失败）
    8.reslove 之后不能rejrct reject之后不能resolve
    9.executor是是立即执行的
 */

const Promise = require('../Promise/promise');
const promise = new Promise((resolve, reject) => {
    // resolve('success');
    // throw new Error('error');
    // reject('fail');
    // reject('fail2');
    // reject('fail3');
    setTimeout(() => {
        resolve('success');
    }, 1000);
});
promise.then((value) => {
    console.log('成功', value);
}, (reason) => {
    console.log('失败', reason);
})
promise.then((value) => {
    console.log('成功1', value);
}, (reason) => {
    console.log('失败1', reason);
})