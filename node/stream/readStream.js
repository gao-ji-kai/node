// 可读流  基于文件系统 
const fs = require('fs');
const path = require('path');
const ReadStream = require('./stream');


/*
    open和close 是针对文件来说的  这两个方法 不只是可读流 可写流 也有
    可读流 都拥有 on('data')、on('end')方法 pause() resume()方法

 */

// const rs = fs.createReadStream(path.resolve(__dirname, 'test.md'), {
const rs = new ReadStream(path.resolve(__dirname, 'test.md'), {
    // fs.open(this.emit('open'))  fs.read(this.emit('data'))
    flags: 'r',// 读取文件
    encoding: null, // 默认是buffer  标识读取的编码格式
    mode: 0o666, // 权限位
    autoClose: true, // 读取完毕后是否自动关闭文件  fs.close
    emitClose: true, // 是否发射close事件  this.emit('close')
    start: 0, // 读取的起始位置
    end: 5, // 读取索引从0开始到索引为5的位置
    hightWaterMark: 2 //  控制读取的速率  字节单位 不写默认是64k 64*1024
})

rs.on('open', function (fd) {
    console.log(fd);
});// 打开文件
const arr = []
rs.on('data', function (chunk) {
    arr.push(chunk)
    console.log(chunk);

    rs.pause();//暂停读取操作  可能做其他操作

})//可以监听data事件 会让非流动模式变为流动模式
rs.on('end', function () {
    console.log('end');
    console.log(Buffer.concat(arr).toString());
})//监听end事件 读取完毕后会触发end事件
rs.on('close', function () {
    console.log('close');
})//监听close事件 读取完毕后会触发close事件
rs.on('error', function () {
    console.log('error');
})//监听err事件 读取完毕后会触发err事件

setInterval(() => {
    rs.resume();//恢复读取操作
}, 1000)