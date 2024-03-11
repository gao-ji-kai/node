//const EventEmitter = require('events');//events是node中的核心模块 内置模块
const EventEmitter = require('./eventEmitter.js');
const util = require('util');
// const event = new EventEmitter();//创建一个事件触发器

//发布订阅
//on订阅{'click':[fn1,fn2]}  emit发布('click',参数)
// 什么时候用发布订阅模式？  点击事件  事件触发的时候 通知订阅的事件


// 手写发布订阅模式
function Girl() { }
//Object.setPrototypeOf(Girl, EventEmitter)// ES6中的方法继承方法
util.inherits(Girl, EventEmitter);//继承EventEmitter
const girl = new Girl();
let waiting = false;
girl.on('click', (val) => {// 当绑定事件时 on中的回调还没存到列表中
    console.log('click1', val);
})
girl.on('click', (val) => {
    console.log('click2', val);
})


girl.emit('click');



// event.emit('click', 1, 2);//发布 不调用emit就不会触发事件  手动触发

// 自动触发  用户绑定了click事件 但是没有点击 也要触发  newListener 死名字
/**
    event.on('newListener', (eventName) => {
        // console.log('eventName', eventName);
        // event.emit(eventName);
        process.nextTick(() => { // 为了保证on中的回调已经存到列表中 异步延迟方法   但是会触发两次
            event.emit(eventName);
        })
    });
 */





/**
    面试题:实现原型继承有几种方案
        1.原型链继承 
            object.prototype.__proto__ = parent.prototype
            obj.prototype = Object.create(parent.prototype)
            Object.setPrototypeOf(obj.prototype,parent.prototype)
        2.构造函数继承
        3.组合继承
        4.寄生组合继承
        5.ES6中的class继承
        const util = require('util'); //util.promisify 实现promise化 util.inherits 实现继承


 */