const b = require('./module-B.js')
console.log(b,'a');


module.exports = 'module-A'


// 循环引用 commonjs规范中 不会发生死循环  只会加载已经加载的部分

/**
    希望相互引用时 可以同时拿到对方的结果 
        1.避免使用循环引用
        2.采用非强制的依赖关系



    第一次运行a模块的时候 会将a模块进行缓存 ，并且此时a模块的状态是一个loaded:false
    这是b模块加载a模块时  发现a的loaded的状态依旧是false  死循环 直接将 a模块的exports返回出去

 */
