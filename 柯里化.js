// 高阶函数

// 函数柯理化(把一个函数 拆分成多个"小"函数，每个函数的参数只能有一个)
// 偏函数 (也是柯理化的一种  但是参数不是一个一个传递的  而是一部分一部分传递的)

// 正常编写代码 区分不细  偏函数也被称为柯理化
function fn(a, b, c) {

}

// 例如  做菜  西红柿鸡蛋  我们可以看成 将 一个个函数 当做步骤 炒鸡蛋是一个函数  放西红柿是一个函数 加调料是另外一个函数 最终他们三个函数加起来  形成一道菜

// let fn1 = fn('鸡蛋')
// let fn2 = fn1('西红柿') //也可以方便组合 也可以方便复用
// let fn3 = fn1('调料')

// 偏函数 ( 也是柯理化的一种  但是参数不是一个一个传递的  而是一部分一部分传递的)
// let fn4 = fn('鸡蛋', '西红柿')
// let fn5 = fn4('调料')


// 判断类型 Object.prototype.toString.call   constructor(Array,Object)  instanceof  typeof(基本类型,null也是个对象)
// function isType(val, typing) {// 判断某个变量是不是某个类型  
//     return Object.prototype.toString.call(val).slice(8, \\\\\\\-1) === typing
// }
// // 判断某个变量是不是字符串
// console.log(isType('hello', 'String'));
// console.log(isType(1, 'String'));


// 通过高阶函数可以缓存变量
function isType(typing) {// 判断某个变量是不是某个类型  
    // typing 存到这里
    return (val) => {// 定义
        return Object.prototype.toString.call(val).slice(8, -1) === typing
    }
}
let isString = isType('String');// 闭包  定义的函数的作用域和执行函数的作用域不是同一个 就会产生闭包
console.log(isString('hello'));
console.log(isString(111))


// 实现一个通用的柯化函数
function sum(a, b, c) {// 当传入的参数与函数的参数个数相等时，执行函数  第一次 传入1,2  将1,2存起来 第二次传入3  将3和之前的1,2相加再执行函数
    return a + b + c
}

function curry(fun) {// 柯理化函数一定是高阶函数
    const curried = (...args) => {// 用户执行时传递的参数  参数个数不定
        if (args.length < fun.length) {// 传递的参数个数大于等于函数的参数个数时，执行函数
            return (...others) => {
                return curried(...args, ...others)
            }
        } else {
            return fun(...args)
        }
    }
    return curried
}
let curried = curry(sum)
curried(1, 2)(3)

function isType(typing, val) {// 判断某个变量是不是某个类型  
    // typing 存到这里
    return Object.prototype.toString.call(val).slice(8, -1) === typing
}
let isString = curry(isType)('String');
console.log(isString('hello'));
console.log(isString(1));

// 希望截取字符串第一项  转为大写  如abc => Abc  顺序自己定
