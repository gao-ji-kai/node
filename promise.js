console.log('promise.js');
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
function reslovePromise(x, promise2, resolve, reject) {
    // 用x来决定promise2是成功还是失败
    if (x === promise2) {
        return reject(new TypeError('[TypeError: Chaining cycle detected for promise #<Promise>] error]'))
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
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === FULFILLED) {
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


module.exports = Promise