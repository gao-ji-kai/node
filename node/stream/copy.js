const fs = require('fs');
const path = require('path');

const rs = fs.createReadStream(path.resolve(__dirname, 'test.md'), {
    highWaterMark: 4
});
const ws = fs.createWriteStream(path.resolve(__dirname, 'copy.md'), {
    highWaterMark: 1
})

rs.on('data', (data) => {
    console.log(data);
    //收支不平衡 因为 读的快 写得慢 
    let flag = ws.write(data)// 写入后 是否到达预期
    if (!flag) {// 已经超过预期了  如果还写 会导致内存溢出  同时 也不应该在继续读取操作了
        rs.pause()
    }
})
rs.on('end', () => {
    console.log('读取结束');
    ws.end()// 读取完毕后 关闭写入流
})
ws.on('drain', () => {

    rs.resume()// 当前的写入操作完成后 会触发drain事件  代表可以继续读取了
})

ws.on('close', () => {
    console.log('关闭');
})

/*
  fs.readFile 不能操作大文件
  大文件采用流的方式 文件流
  文件的可读流 on('data') on('end')
  文件的可写流 write end

 
 
 */