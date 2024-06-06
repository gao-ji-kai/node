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
import http, { get } from 'http';
import path from 'path';
import os from 'os';// 系统的信息都在这个
import url from 'url';
import fsPromises from 'fs/promises';//内置的 用于文件操作
import { createReadStream, readFileSync } from 'fs';
// console.log('os', Object.values(os.networkInterfaces()).flat().filter(item => item.family === 'IPv4'));

// 以上是内置模块

import chalk from 'chalk';
import mime from 'mime';
import ejs from 'ejs';

import { getNetWorkInterfaces } from './utils.js';

const __filename = new URL(import.meta.url).pathname;// 获取当前文件的绝对路径
const __dirname = path.dirname(__filename);// 获取当前文件所在的目录
console.log('121212', __dirname);// D:\project\node\nodejs\HTTP\src

class Server {
    constructor(options = {}) {
        console.log('options', options);// { port: 4000, directory: 'D:\\project\\node\\nodejs\\HTTP' }
        this.port = options.port;
        this.directory = options.directory;
        this.template = readFileSync(path.resolve(__dirname, 'tmpl.html'), 'utf8');
    }
    sendFile(assestUrl, req, res, statObj, pathname) {
        const fileType = mime.getType(assestUrl) || 'text/plain';// 获取文件的类型
        res.setHeader('Content-Type', `${fileType};charset=utf-8`);//解决如果有中文乱码问题
        createReadStream(assestUrl).pipe(res);// 读取文件流 通过管道写入响应流

    }
    sendError(assestUrl, req, res) {
        console.log(`can not find  ${assestUrl}`);
        res.statusCode = 404;
        res.end('Not Found');
    }
    async processDir(assestUrl, pathname, req, res) {

        try {
            const assestUrl = path.join(assestUrl, 'index.html');
            await fsPromises.stat(assestUrl)
            this.sendFile(assestUrl, req, res);

        } catch (e) {
            const dirs = await fsPromises.readdir(assestUrl)//将访问的路径的文件夹下的文件列表返回
            const tmplStr = ejs.render(this.template, {
                dirs: dirs.map(dir => ({
                    url: path.join(pathname.url, dir),
                    dir
                }))
            })
            res.setHeader('Content-Type', `text/html;charset=utf-8`);
            res.end(tmplStr);
        }

    }
    handlerRequest = async (req, res) => {
        console.log(this);// this指向的是Server的实例
        const { pathname, query } = url.parse(req.url, true);

        // 获取文件的状态信息
        const assestUrl = path.join(this.directory, decodeURIComponent(pathname));
        try {
            const statObj = await fsPromises.stat(assestUrl)
            if (statObj.isFile()) {
                // 是文件
                this.sendFile(assestUrl, req, res);
            } else {
                // 是文件夹 需要看文件夹下是否有index.html 有的话返回index.html 没有的话返回文件夹下的文件列表
                // const indexUrl = path.join(assestUrl, 'index.html');

                this.processDir(assestUrl, pathname, req, res);
            }

        } catch (e) {
            this.sendError(assestUrl, req, res);
        }
    }
    start() {
        const server = http.createServer(this.handlerRequest);
        server.listen(this.port, () => {
            console.log(`${chalk.yellow('Starting up http - server, serving')} `);
            console.log(`${chalk.green('Available on:')}`);
            getNetWorkInterfaces().map(address => {
                console.log(`${chalk.green(`http://${address}:${this.port}`)}`);
            })
        });
    }

}
// 静态服务 为了哪个目录提供的
// new Server({
//     port: 4000,
//     directory: process.cwd()// 在哪里启动的服务 就以哪个目录为准
// }).start()


export default Server;