
// 生成器  在生成的过程中可以暂停 ,可以自己控制是否继续执行

// 数组迭代器 所谓的生成器就是一个对象 有一个next方法 每次调用next方法都会返回一个对象 对象有两个属性 value done


// 类数组 有索引 有长度 能遍历

//元编程 可以改写js本身的功能 Object.prototype.toString.call()
let obj = { get [Symbol.toStringTag]() { return 'hahaha' } }
console.log(obj.toString());// [object hahaha]  重写了toString方法  正常情况下是[object Object]


/**
    以前的实现方式：
         let likeArray = { 0: 1, 1: 2, 2: 3, length: 3,[Symbol.iterator](){
                    let index = 0;
                    return {
                        next:()=>{// 一个对象有一个next方法  每次调用next方法都会返回一个对象 对象有两个属性 {value done}
                            return { value: this[index], done: index++ === this.length }
                        }
                    }
                }}
    现在的实现方式：
                
            let likeArray = {
                0: 1, 1: 2, 2: 3, length: 3, [Symbol.iterator]: function* () {  *表示这是一个生成器 是生成器语法
                    let index = 0;
                    let len = this.length
                    while (index !== len) {
                        yield this[index++]
                    }
                }
            }
        
 */

let likeArray = {
    0: 1, 1: 2, 2: 3, length: 3, [Symbol.iterator]: function* () { //*表示这是一个生成器 是生成器语法
        let index = 0;
        let len = this.length
        while (index !== len) {
            yield this[index++]
        }
    }
}
const arr = [...likeArray]//报错 无迭代器 不能展开    object is not iterable
// const arr = Array.from(likeArray)

// console.log('arr', arr);


function* gen() {
    try {
        let a = yield 1 // js执行是先走到等号右边   遇到yield就会暂停
        console.log(a);
        let b = yield 2 // 第二次next传递的参数会给上一次yield的返回值
        console.log(b);
        let c = yield 3
        console.log(c);
        return undefined
    } catch (e) {
        console.log(e);
    }
}
let it = gen() // 生成器返回的是一个迭代器(iterator) 迭代器上有一个next方法

console.log(it.next('asasa'));// { value: 1, done: false }  第一次next传递参数是无意义的
it.throw('error') // 调用了第一次next的时候(不能上来就抛异常) 可以暂停逻辑 如果觉得逻辑有异常 可以通过throw方法抛出异常
console.log(it.next('acb'));// { value: 2, done: false }
console.log(it.next('abcd'));// { value: 3, done: false }
//console.log(it.next());// { value: undefined, done: true }


const fs = require('fs/promises');
const path = require('path');
// const co = require('co') // 引用co库 用来自动化执行生成器
function* readResult() {// 异步代码同步化
    let fileName = yield fs.readFile(path.resolve(__dirname, 'name.txt'), 'utf8')
    let age = yield fs.readFile(path.resolve(__dirname, fileName), 'utf8')
    return age
}

function co(it) {
    return new Promise((resolve, reject) => {// 同步迭代用for循环 异步迭代用递归、回调
        function next(data) {
            let { value, done } = it.next(data)
            if (done) {//完成了
                resolve(value)
            } else {
                Promise.resolve(value).then(data => {
                    next(data)
                }, reject)
            }
        }
        next()// 上来先来一次
    })
}

co(readResult()).then(data => {
    console.log('data', data);
})

// let it2 = readResult()
// let { value, done } = it2.next()
// value.then(data => {
//     let { value, done } = it2.next(data)
//     value.then(data => {
//         let { value, done } = it2.next(data)
//         console.log('value', value);
//     })
// })




// async await