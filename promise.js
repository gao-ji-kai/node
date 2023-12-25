const { on } = require("events");
const { type } = require("os");

console.log('promise.js');
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

// 此函数的主要目的是判断x 是不是promise
// 规范中说明   我们的promsie可以与别的promise进行交互
function reslovePromise(x, promise2, resolve, reject) {
    let called = false; // 防止多次调用成功或者失败
    // 用x来决定promise2是成功还是失败
    if (x === promise2) {
        return reject(new TypeError('[TypeError: Chaining cycle detected for promise #<Promise>] error]'))
    }

    // promise实例 要么是对象 要么是函数
    if (typeof x === 'object' && x !== null || typeof x === 'function') {
        try {
            let then = x.then // 看是否有then方法
            if (typeof then === 'function') {
                if (called) return; // 为了防止多次调用
                called = true; // 说明已经调用过了
                // 有可能是promise
                then.call(x, y => {
                    // 如果y是promise 就继续递归解析promise
                    reslovePromise(y, promise2, resolve, reject)
                }, r => {
                    if (called) return; // 为了防止多次调用
                    called = true; // 说明已经调用过了
                    reject(r)
                })
            } else {
                // 普通对象
                resolve(x) // {then:{}} | {}|function
            }

        } catch (e) {
            if (called) return; // 为了防止多次调用
            called = true; // 说明已经调用过了
            reject(e)
        }
    } else {
        // 普通值
        resolve(x) // 普通值  直接向下传递即可

    }


}
class Promise {
    constructor(executor) {
        //默认promise的状态
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        const resolve = (value) => {
            // 只有pending状态才能改变状态
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        try {
            // 立即执行 如果执行时发生异常 也会走reject
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }

    }
    then(onFulfilled, onRejected) {
        // then方法中 如果没有传递参数 那么可以透传到下一个then中
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data;
        
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === FULFILLED) {
                // 如果不是用该异步方法 是拿不到promise2的
                process.nextTick(() => { //异步方法  可等待当前代码执行完毕后执行 
                    try {
                        // 立即执行 如果执行时发生异常 也会走reject
                        let x = onFulfilled(this.value)
                        reslovePromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e)//取值出错
                    }
                })

            } else {
                // 走到这里 说明x是一个普通值
                resolve(x) // 普通值  直接向下传递即可

            }
            if (this.status === REJECTED) {
                // 如果不是用该异步方法 是拿不到promise2的
                process.nextTick(() => { //异步方法  可等待当前代码执行完毕后执行 
                    try {
                        // 立即执行 如果执行时发生异常 也会走reject
                        let x = onRejected(this.reason)
                        reslovePromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })

            }
            if (this.status === PENDING) {
                // 订阅
                this.onResolvedCallbacks.push(() => {
                    // 如果不是用该异步方法 是拿不到promise2的
                    process.nextTick(() => { //异步方法  可等待当前代码执行完毕后执行 
                        try {
                            // 立即执行 如果执行时发生异常 也会走reject
                            let x = onFulfilled(this.value)
                            reslovePromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })


                })
                this.onRejectedCallbacks.push(() => {
                    // 如果不是用该异步方法 是拿不到promise2的
                    process.nextTick(() => { //异步方法  可等待当前代码执行完毕后执行 
                        try {
                            // 立即执行 如果执行时发生异常 也会走reject
                            let x = onRejected(this.reason)
                            reslovePromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
            }
        })
        return promise2

    }

}

Promise.deferred = function () { 
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject

    })
    return dfd
}

// npm i promises-aplus-tests -g 


module.exports = Promise