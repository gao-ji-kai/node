const fs = require('fs');
const path = require('path');
const WriteStream = require('./wStream');
const ReadStream = require('./stream');

const ws = new WriteStream(path.resolve(__dirname, 'copy1.md'), {
    flags: 'w',//标识位  写w
    encoding: null, // 默认是buffer  标识读取的编码格式
    mode: 0o666, // 权限位
    autoClose: true, // 读取完毕后是否自动关闭文件  fs.close
    emitClose: true, // 是否发射close事件  this.emit('close')
    start: 0, // 读取的起始位置
    // 写入时 意味着 希望占用多大的内存空间 hightWaterMark 当写入的数据达到或超过这个值时，就会返回false，意味着不要再写入了 如果再写入就会导致内存溢出
    hightWaterMark: 1 //  控制读取的速率  字节单位 不写默认是64k 64*1024  
});

const rs = new ReadStream(path.resolve(__dirname, 'copy.md'), {
    flags: 'r',//标识位  写w
    encoding: null, // 默认是buffer  标识读取的编码格式
    mode: 0o666, // 权限位
    autoClose: true, // 读取完毕后是否自动关闭文件  fs.close
    emitClose: true, // 是否发射close事件  this.emit('close')
    start: 0, // 读取的起始位置
    // 写入时 意味着 希望占用多大的内存空间 hightWaterMark 当写入的数据达到或超过这个值时，就会返回false，意味着不要再写入了 如果再写入就会导致内存溢出
    hightWaterMark: 4 //  控制读取的速率  字节单位 不写默认是64k 64*1024  
});
rs.pipe(ws);