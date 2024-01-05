// 高阶函数的概念

/*
    概念：（1）如果一个函数返回的是一个函数（回调函数），那么这个函数就是高阶函数
          （2）一个函数接收的参数是一个函数，那么这个函数也是高阶函数
*/


// e.g
function a() {// 满足1
    // todo...
    return function () {
        console.log('我是回调函数')
    }
}


function b(callback) {//满足2

}

b(function () { })

function c(fn) {
    return function () {
        fn()// 两者都满足也是高阶函数
    }
}


` 解决哪些问题、场景`

function core(a,b,c) {//我们希望对这个core进行封装  比如 在core执行之前做一些事情，或执行之后做一些事情
    console.log('core', a, b, c)
}

// 切片编程
Function.prototype.before = function (callback) {
    return (...args)=> {// 箭头函数中是没有this的, 没有原型  没有arguments
        // todo...
        callback(); //做的其他逻辑
        this(...args);// AOP 切片增加额外的逻辑，在原有的逻辑上增加一些逻辑
        //todo...
    }
}

// 1.在core执行之前做一些事情
const newCore = core.before(() => {
    console.log('增添的逻辑');
})
newCore(1, 2, 3);

// before 方法 可以对原有的函数进行扩展


//
