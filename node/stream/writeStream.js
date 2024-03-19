const fs = require('fs');
const path = require('path');



const ws = fs.createWriteStream(path.resolve(__dirname, 'copy.md'), {
    flags: 'w',//标识位  写w
    encoding: null, // 默认是buffer  标识读取的编码格式
    mode: 0o666, // 权限位
    autoClose: true, // 读取完毕后是否自动关闭文件  fs.close
    emitClose: true, // 是否发射close事件  this.emit('close')
    start: 0, // 读取的起始位置
    // 写入时 意味着 希望占用多大的内存空间 hightWaterMark 当写入的数据达到或超过这个值时，就会返回false，意味着不要再写入了 如果再写入就会导致内存溢出
    hightWaterMark: 2 //  控制读取的速率  字节单位 不写默认是64k 64*1024  
});

//可写流 有两个常用的方法   write()  end()



// 用链表实现的队列 从而将多次写入变为顺序写入
// ws.write('abc', () => {// 不可写数字
//     console.log('写入成功');
// });

// ws.write('def', () => {
//     console.log('写入成功');
// });


// 只用一个字节完成写入操作 
let idx = 0
function write() {
    if (idx < 10) {
        let flag = ws.write(idx++ + '')
        console.log(flag);
        if (flag) {
            write()
        }
    }
}
write()
// 当 当前的写入操作个数达到了highWaterMark时 会触发drain事件
ws.on('drain', () => {
    console.log('干了');
    write()
})