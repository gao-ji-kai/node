const path = require('path')
const fs = require('fs')
const vm = require('vm')

function Module(id) {
    this.id = id
    this.exports = {}

}

// 策略 根据后缀名调用不同的方法
Module._extensions = {
    '.js'(module) {
        const content = fs.readFileSync(module.id, 'utf8')//读取文件内容
        const fn = vm.compileFunction(content, ['exports', 'require', 'module', '__filename', '__dirname'])

        //这里的this指向的是module.exports
        const exports = module.exports
        let thisValue = exports
        let require = req
        let filename = module.id
        let dirname = path.dirname(filename)
        // 让函数执行 module.exports就是我们的结果 hello
        Reflect.apply(fn, thisValue, [exports, require, module, filename, dirname])

    },
    '.json'(module) {
        const content = fs.readFileSync(module.id, 'utf8')
        module.exports = JSON.parse(content)
    }
}
// 加载模块
Module.prototype.load = function () {
    let ext = path.extname(this.id) //获取文件的后缀名
    Module._extensions[ext](this) //根据后缀名调用不同的方法
    this.exports
}

// 缓存  重复加载的时候直接取缓存
Module._cache = {}



// 解析文件名
Module._resolveFilename = function (id) {
    const filename = path.resolve(__dirname, id)
    // 判断文件是否存在
    if (fs.existsSync(filename)) {
        return filename
    }
    const keys = Object.keys(Module._extensions)
    for (let i = 0; i < keys.length; i++) { //尝试添加后缀
        const ext = keys[i]
        const filename = path.resolve(__dirname, id + ext)
        if (fs.existsSync(filename)) {
            return filename
        }
    }

    throw new Error('module not found')
}

function req(id) {
    const filename = Module._resolveFilename(id)
    // 如果缓存中有 直接返回
    if (Module._cache[filename]) {
        return Module._cache[filename].exports
    }
    const module = new Module(filename)//创建模块  这个对象里最重要的就是exports对象
    // 缓存
    Module._cache[filename] = module // 加载过 就缓存起来

    // 加载模块
    module.load()
    return module.exports
}



let a = req('./module.js') //require 拿到的是module.exports的结果 如果引用对象里面的内容变化了 就会重新拿到最新的结果
a = req('./module.js')
console.log(a);

let b = req('./module.js')
setTimeout(() => {
    b = req('./module.js')
    console.log(b);
}, 2000)

// this和module.exports 也是同一个值 可以相互调用
let exports = module.exports
// √ exports.a = 1
// × exports = { a: 1 }  //用户不能直接改变exports的引用 因为不会导致module.exports的变化
return module.exports

// 导出的方式 1.this.xxx  exports.xxx  module.exports = xxx  module.exports

// commonjs规范中 如果有默认导出  普通导出是无效的

/**
    // 采用vscode调试
        1. 在vscode中打开项目
        2. 在需要调试的文件中打上断点


    1.调用require方法
    2.加载模块 Module._load
    3.通过Modle._resolveFilename 核心 是给我们传入的文件名 加上后缀名 (会帮我们解析成绝对路径)
    4.如果这个文件加载过 走缓存 否则再去加载模块
    5.加载模块的核心就是创建一个模块实例 new Module()=>{id：文件名，exports:导出的结果是什么}
    6.将模块缓存起来
    7.要加载的文件 要看文件的扩展名是什么 如果是js文件 调用Module._extensions['.js']方法 
    8.根据后缀名调用不同的方法(策略模式) 加载js的策略
    9.js的加载就是读取文件内容
    10.给文件内容包装一个函数，让这个函数执行  (代码中一定会给module.exports赋值)
        require方法 最终返回的是module.exports 用户只要将结果放到module.exports上即可
 */
