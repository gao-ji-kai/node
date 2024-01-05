
// 采用非强制引用的方式引入模块
const a = require('./cic-a');
const b = require('./cic-b');

a.saveModule(b)
b.saveModule(a)


a.fn() //a中使用b
b.fn() //b中使用a

/**
    模块有自己的加载方式
        原生模块  第三方模块 (路径没有./ ../ 的称为原生模块) 从自己的目录 递归向上查找 找到node_modules目录 找到对应的模块 看是否有package.json文件 main.js
        文件模块  自己写的模块 从自己的目录 递归向上查找 找到对应的模块

    相对路径 会先找文件 再找文件夹

    尽量避免 模块的文件夹名和文件名重名
       
   npm  node package manager  node包管理器 node自带的

    npm init -y 初始化一个package.json文件 记录安装的依赖和当前包的信息(包:多个模块组成的叫包 有package.json文件的叫包)

    模块安装的方式
        全局安装  npm install xxx -g  全局安装的模块只能在命令行中使用 不记录在package.json中
        本地安装  npm install xxx  本地安装的模块只能在当前目录下使用
    
     npm config list 查看npm的配置
 */


/*
        自己编写一个全局模块
            1.起一个唯一的包名
            2.在package.json中配置bin属性 指定一个可执行文件
            3.在可执行文件中写入#!/usr/bin/env node
            4.在命令行中执行npm link 就可以将当前包链接到全局


*/
