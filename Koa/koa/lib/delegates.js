
/**
 * 定义一个Delegator构造函数，用于代理对象的属性和方法 接收两个参数
 * @param {*} proto 原型对象
 * @param {*} target 目标属性
 */

// 代理方法
function Delegator(proto, target) {
    // proto.__defineGetter__(target, function () {
    //     return this[property][target];
    // });
    // 如果不是Delegator的实例，就返回一个新的Delegator实例
    if (!(this instanceof Delegator)) return new Delegator(proto, target);
    this.proto = proto;
    this.target = target;

}
// 在Delegator的原型上定义一个getter方法 此方法接收一个参数name(属性名)
Delegator.prototype.getter = function (name) {
    // proto->context target->request
    const { proto, target } = this;
    // 给proto对象定义一个name属性 
    Object.defineProperty(proto, name, {
        // 通过getter方法获取target对象的name属性
        get() {
            return this[target][name];
        },
        configurable: true// 可配置
    })
    // 返回Delegator实例 以便链式调用
    return this;
}

// 在Delegator的原型上定义一个setter方法 此方法接收一个参数name(属性名)
Delegator.prototype.setter = function (name) {
    // proto->context target->request
    const { proto, target } = this;
    // 给proto对象定义一个name属性 
    Object.defineProperty(proto, name, {
        // 通过getter方法获取target对象的name属性
        set(val) {
            this[target][name] = val;
        },
        configurable: true// 可配置
    })
    // 返回Delegator实例 以便链式调用
    return this;
}

// 在Delegator的原型上定义一个access方法 此方法接收一个参数name(方法名)
Delegator.prototype.access = function (name) {
    // 调用getter方法 
    return this.getter(name).setter(name);
}

// 在Delegator的原型上定义一个method方法 此方法接收一个参数name(方法名)
Delegator.prototype.method = function (name) {
    // proto->context target->request
    const { proto, target } = this;
    // 给proto对象定义一个name属性
    proto[name] = function (...args) {
        // 调用target对象的name方法
        // this[target][name]是request对象的方法 通过apply方法调用 传入参数args 
        return this[target][name].apply(this[target], args);
    }
    // 返回Delegator实例 以便链式调用
    return this;
}

module.exports = Delegator;