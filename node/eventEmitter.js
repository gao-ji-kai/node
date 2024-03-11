function EventEmitter() {
    this._events = {}//实例上的私有属性
    // 共享属性

}
// 订阅
EventEmitter.prototype.on = function (eventName, callback) {
    if (!this._events) this._events = {};// 如果没有订阅过事件

    if (eventName !== 'newListener') {
        this.emit('newListener', eventName);
    }

    (this._events[eventName] || (this._events[eventName] = [])).push(callback);
}
//只订阅一次
EventEmitter.prototype.once = function (eventName, callback) {
    let once = (...args) => {
        callback(...args);
        this.off(eventName, callback); // 关闭订阅
    }
    once.l = callback; // 为了off方法中的filter方法
    this.on(eventName, once); // 绑定的是one方法
}
// 发布
EventEmitter.prototype.emit = function (eventName, ...args) {
    if (!this._events) this._events = {};// 如果没有订阅过事件
    if (this._events[eventName]) {
        this._events[eventName].forEach(fn => fn(...args));
    }
}
module.exports = EventEmitter;

//关闭订阅
EventEmitter.prototype.off = function (eventName, callback) {
    if (!this._events) this._events = {}; // 如果没有订阅过事件
    if (this._events[eventName]) {
        this._events[eventName] = this._events[eventName].filter(fn => fn !== callback && fn.l !== callback);
    }
}



/*
    on 订阅
    emit 发布
    on('newListener')绑定监听事件
    off 关闭订阅
    once 只订阅一次
 */