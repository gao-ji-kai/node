const fs = require('fs');// file system 最好使用绝对路径
const path = require('path');// 路径模块
let person = {}


// 订阅 
let event = {
    _arr: [],
    // 订阅  把函数存起来
    on(callback) {
        this._arr.push(callback)
    },
    // 发布  把函数拿出来依次执行
    emit(...args) {
        this._arr.forEach(fn => fn(...args))
    }
}
event.on(function (obj, key, data) {
    person[key] = data;
    // 每次读取成功后 就会触发此方法
    console.log('读取一个', obj, key)
})
event.on(function () {
    // 如果读到person有两个属性就打印
    if (Object.keys(person).length === 2) {
        console.log('读取完毕', person)
    }
})



fs.readFile(path.resolve(__dirname, 'name.txt'), 'utf8', function (err, data) {
    // person.name = data;
    event.emit('person', 'name', data)

})
fs.readFile(path.resolve(__dirname, 'age.txt'), 'utf8', function (err, data) {
    // person.age = data;
    event.emit('person', 'age', data)
})