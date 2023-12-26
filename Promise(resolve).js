// Promise.resolve 是ECMAscript2018规范 自己实现的 (为了快速创建Promise并且具备等待效果)
// 之前是参考的promise A+ 规范实现的

const Promise = require('./promise.js');


// Promise.resolve 有一个特点 会产生一个新的 Promise  如果传入的值 是一个promise 会等待这个promise执行完毕
// Promise.resolve 可以解析传入的promise  具备等待效果
Promise.resolve(new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve('ok')
    },1000)
})).then(data => {
    console.log(data)

})    // 静态方法  返回一个成功的promise  产生一个then方法


// new Promise((resolve, reject) => {
//     resolve('abc')
// }).then().then(data => {
//     console.log(data)
// })

Promise.reject('err').catch(err => {
    console.log(err)
},function(err){
    console.log(err)
})



// resolve具备等待特点  reject没有等待特点 错误可以通过catch捕获