const fs = require('fs');// file system 最好使用绝对路径
const path = require('path');// 路径模块

// 读取文件
//  异步(不能立刻拿到返回值，可以做别的事情，非阻塞)和同步(可以立刻拿到返回值，阻塞状态，不能做其他的)的区别
// 同步阻塞、异步非阻塞
// console.log((path.resolve(__dirname, 'name.txt')));


// node api中的回调函数第一个参数永远是error 意味着优先错误处理
let person = {}
/**
     * 方式一
        let i = 0;
        function out () {
        if (++i === 2) {
            console.log(person)
        }
        }   
    * 方式二
        function after(times, callback) {
            return function () {// out
                if (--times === 0) {
                    callback()
                }
            }
        }
        after(2, function () {
            console.log(person)
        })
 */
function after(times, callback) { //高阶函数 处理异步问题
    return function () {// out
        if (--times === 0) {
            callback()
        }
    }
}
let out = after(2, function () { // 只能等待两次都完成才执行 无过程
    console.log(person)
})

fs.readFile(path.resolve(__dirname, 'name.txt'), 'utf8', function (err, data) {
    person.name = data;
    out() //像发布

})
fs.readFile(path.resolve(__dirname, 'age.txt'), 'utf8', function (err, data) {
    person.age = data;
    out() //发布
})
// 发布订阅模式  订阅 on  发布 emit  观察者模式

// 同步多个异步操作的返回值结果 (Promise.all)

