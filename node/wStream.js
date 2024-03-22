// 之前的流  都是基于fs模块实现的 但是fs模块是基于操作系统的  有可能会出现问题  所以node提供了stream模块


//实现子类重写父类方法

// class Parent {
//     read() {
//         console.log('父类的read');
//         console.log('read');
//     }
//     _read() {
//         console.log('父类自己的read');
//     }
// }

// class Child extends Parent {
//     _read() {
//         // super.read();
//         console.log('child 重写了父类的read方法');
//     }

// }
// const c = new Child();
// c._read();



const fs = require('fs');
const path = require('path');
/*
    父类 Readable.prototype  read ->this._read() ->子类的_read
    子 new ReadStream  ReadStream.prototype._read=function(){}

     父类拥有一个read方法 会调用子类的_read方法 ->子类重写了父类的read方法   
    子类创建后会监听data事件  当监听到data事件后 会调用父类的read方法  read方法会调用子类的_read方法 读取到的内容会调用父类的push方法
 */


// const rs = fs.createReadStream(path.resolve(__dirname, 'copy.md'), {
//     flags: 'r',//标识位  写w
//     encoding: null, // 默认是buffer  标识读取的编码格式
//     mode: 0o666, // 权限位
//     autoClose: true, // 读取完毕后是否自动关闭文件  fs.close
//     emitClose: true, // 是否发射close事件  this.emit('close')
//     start: 0, // 读取的起始位置
//     // 写入时 意味着 希望占用多大的内存空间 hightWaterMark 当写入的数据达到或超过这个值时，就会返回false，意味着不要再写入了 如果再写入就会导致内存溢出
//     hightWaterMark: 4 //  控制读取的速率  字节单位 不写默认是64k 64*1024  
// });
const { Writable,Stream } = require('stream');
class MyWriteStream extends Writable {
    _write(data, encoding, callback) {

        console.log(data)
        callback();// 调用callback会清空后续逻辑 
    }
}
const mw = new MyWriteStream();
mw.write('写入成功')

//判断类型是不是流
onsole.log(mw instanceof Stream);
