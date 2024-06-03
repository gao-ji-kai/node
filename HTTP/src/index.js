//希望根据路径的不同 返回对应的资源

/*
    const http = require('http');// 创建一个http服务
    const fsPromises = require('fs/promises');
    const { createReadStream } = require('fs');
    const path = require('path');
    const zlib = require('zlib');
    const url = require('url');// 用于路径处理
    const chalk = require('chalk');// 用于美化输出  高版本模块 不能require引入 不兼容import语法
    // 一般可降级处理 npm install chalk@4  或者 在package.json中配置 "type": "module" 然后把所有的require改为import
 */
import http from 'http';
import chalk from 'chalk';
import path from 'path';



class Server {
    constructor(options = {}) {
        this.port = options.port;
        this.directory = options.directory;
    }
    handlerRequest = (req, res) => {
        console.log(this);// this指向的是Server的实例
    }
    start() {
        const server = http.createServer(this.handlerRequest());
        server.listen(this.port, () => {
            console.log(`${chalk.yellow('Starting up http - server, serving')} ${chalk.green(`${path.resolve(this.directory)}`)}
            ${chalk.green('Available on:')}
            http://10.244.21.68:${this.port}`);
        });
    }

}
// 静态服务 为了哪个目录提供的
new Server({
    port: 4000,
    directory: process.cwd()// 在哪里启动的服务 就以哪个目录为准
}).start()