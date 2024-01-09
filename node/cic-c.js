
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

            需要在 入口中 添加 #!/usr/bin/env node 运行环境

*/

/**
    --save  开发 上线都需要用到的依赖 dependencies
    --save-dev 开发时需要用到的依赖 devDependencies 
 
    npm i xxx --save  开发 上线都需要用到的依赖
    npm i xxx --save-dev 开发时需要用到的依赖

    package-lock.json 锁定版本号 保证安装的版本号一致 会随着pages.json中版本号的变化而变化

    项目依赖 dependencies
    开发依赖 devDependencies
    同等依赖 peerDependencies 要求安装 但是不安装不报错
    可选依赖 optionalDependencies  
    打包依赖 bundleDependencies 是个数组 npm pack 打包的时候会将这个数组中的依赖一起打包

 */

/*
    版本管理 
        major.minor.patch 主版本.次版本.补丁版本
        semever 语义化版本号 

        预发版本 做测试的
            1.0.0-alpha.1
            1.0.0-beta.1 公开测试

    版本号标识符
     ^2.2.0 只能是2版本  不能是1版本开头或2开头
     ~1.1  限制了  只能是1.1开头的版本  

    scripts  设置脚本 可以在命令行中执行 npm run xxx 来执行

    npx 命令 是npm5.2版本之后自带的 可以执行node_modules/.bin目录下的命令(命令不存在会先安装再执行)

    npm publish 发布包 需要切换源到npm官方源 
*/

