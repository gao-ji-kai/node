/**
    node.js是一个基于Chrome V8引擎的JavaScript运行环境
        node.js不是一门语言,不是库,不是框架 runtime 运行时 (底层用的是V8引擎构建的)

    node的特点：
        1.事件驱动
        2.非阻塞IO模型(异步) IO就是文件的读写
        3.轻量和高效
        4.支持js语法 不支持BOM DOM
        5.有很多内置模块和第三方模块

    异步非阻塞、同步非阻塞、同步阻塞(node中提供的api,都支持异步的,底层采用的是多线程模型)、异步阻塞
        同步阻塞:在执行代码时,如果遇到了阻塞代码,则后面的代码需要等待阻塞代码执行完毕后才能执行
        同步非阻塞:在执行代码时,如果遇到了非阻塞代码,则后面的代码不需要等待非阻塞代码执行完毕就可以执行
        异步阻塞:在执行代码时,如果遇到了阻塞代码,则后面的代码需要等待阻塞代码执行完毕后才能执行
        异步非阻塞:在执行代码时,如果遇到了非阻塞代码,则后面的代码不需要等待非阻塞代码执行完毕就可以执行

    单线程、多线程
        多线程：可以同时执行多个任务  适合CPU密集型的任务(压缩、加密)
            优点：提高效率、可以并行，利用多核CPU
            缺点：消耗内存、浪费资源 线程间的通信比较复杂， 多线程如果冲突 会导致程序崩溃
        单线程：同时只能执行一个任务   适合IO密集型的任务(文件操作、网络操作)
            优点：节省内存、节约资源 线程间通信比较简单
            缺点：容易阻塞


    事件驱动
        按照事件的顺序来触发处理逻辑 (事件环)


    node适合做什么?
        1.编写前端工具 工程化 vite webpack rollup gulp 脚手架
        2.为前端服务的后端  中间层  (client) (bff 格式化、云服务、解决跨域、代理) (server)
        3.创建服务器  Koa  Express  Egg.js  Nest.js
        4.聊天工具  socket.io
        5.实时通信  websocket
        6.爬虫  puppeteer
        7.ssr

    node中的模块化规范(commonjs)
      目前主流的模块化规范有三种:commonjs、ES6
      (1)每个js文件都是一个模块
      (2)如果想给别人使用,需要导出模块 module.exports
      (3)别人想使用这个模块,需要引入模块 require

    模块化规范解决了什么问题?
        1.命名冲突 代码隔离问题 方便代码复用 提升代码的扩展性
        2.文件依赖


 */

// 1.引入模块
// 如果不带路径,则会被识别成原生模块或者第三方模块
// 内部会自动帮我们添加 .js .json .node后缀

// 同步导入
// const r = require('module')
// console.log(r)


/**
     const r = `function () {
                module.exports = 'hello'
                return module.exports
            }` // 会将模块中的代码转换成字符串
 */


/**
    // 如何读文件
        const path = require('path')
        console.log(__dirname);// 当前文件所在的目录  d:/gaojikai/node
        console.log(path.join('a', 'b'));// 只是拼接 a/b
        console.log(path.resolve('a', 'b','/'));// resolve会解析出一个绝对路径   d:/gaojikai/node/a/b

        join!==resolve  在一定场景下 join和reslove是没有区别的  遇到/时  只能用join

        path.extname('a.js') // 获取文件的扩展名
        path.basename('a.js') // 获取文件的文件名


    const fs = require('fs')
    fs.readFileSync(path.reslove(__dirname, './module.js'), 'utf8') // 同步读取文件
    fs.existsSync(path.resolve(__dirname, 'module.js'))

    const fs = require('fs')
    const result = fs.readFileSync(path.reslove(__dirname, './module.js'), 'utf8') // 同步读取文件
    console.log(result);
    //判断文件是否存在
    fs.existsSync(path.resolve(__dirname, 'module.js'))

 */



// eval 会将字符串转换成js代码

const vm = require('vm');//虚拟机模块
vm.runInThisContext('console.log("hello")')// 沙箱(不受外部影响) 可以在沙箱中执行代码  但是不能访问外部的变量


