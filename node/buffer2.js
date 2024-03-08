
/**
 Buffer 是用来存放内容的 表示的是内存空间 无法扩容
    内存一旦声明就无法在原内存上进行扩容
    声明一个buffer 有三种方式
      1.通过长度来声明
        let buffer = Buffer.alloc(5);// 5个字节的buffer
      2.指定buffer中存放的内容
        let buffer = Buffer.from('凯');// 通过字符串来声明
      3.通过数组来声明 (不常用)
        let buffer = Buffer.from([0xe5, 0x87, 0xaf]);// 通过数组来声明

    场景：
        前端上传文件  二进制文件  图片 视频 音频  (创建一个buffer 进行多段存储)
        合并数据 (tcp 传输的时候 会将数据分成多个包进行传输) 我们需要将多个包合并成一个包
        let buffer = Buffer.concat([buffer1, buffer2, buffer3]);

 */

console.log(Buffer.alloc(5));// <Buffer 00 00 00 00 00>
console.log(Buffer.from([100, 200]));// 不常用
console.log(Buffer.from('凯'));// <Buffer e5 87 af>

//合并buffer 通过concat
let buffer1 = Buffer.from('你好').slice(0, 5);
let buffer2 = Buffer.from('好世界').slice(2);
let buffer3 = Buffer.alloc(12);
/*
    target 拷贝目标
    targetStart 从哪个位置进行拷贝
    sourceStart 从哪个字节开始拷贝
    sourceEnd 从哪个字节结束拷贝
 */

// 所谓的copy 就是循环buffer中的每一项 放到大的Buffer中
// Buffer.prototype.copy = function (target, targetStart, sourceStart = 0, sourceEnd = this.length) {
//   for (let i = sourceStart; i < sourceEnd; i++) {
//     console.log('copy');
//     target[targetStart++] = this[i];
//   }

// }
buffer1.copy(buffer3, 0, 0, 5);//有更好的方式 这个api基本不用
buffer2.copy(buffer3, 5, 0, 7);
console.log('buffer3', buffer3.toString());

// 合并buffer
Buffer.concat = function (list, totalLen = list.reduce((memo, current) => memo += current.length, 0)) {
  const bigBuffer = Buffer.alloc(totalLen);// 分配空间
  let pos = 0
  list.forEach(buf => {
    buf.copy(bigBuffer, pos);
    pos += buf.length;
  });
  return bigBuffer;
}
// let buffer = Buffer.alloc(totalLen);
// let offset = 0;
// list.forEach(item => {
//   item.copy(buffer, offset);
//   offset += item.length;
// });
// return buffer;

// 常用concat方法来进行拼接
console.log(Buffer.concat([buffer1, buffer2]).toString());//<Buffer e4 bd a0 e5 a5 bd e4 b8 96 e7 95 8c>


/**
   Buffer的常用方法
      Buffer.alloc()  创建一个指定大小的buffer
      Buffer.from()   创建一个指定内容的buffer
      Buffer.concat() 合并buffer
      buffer.copy()   拷贝buffer
      buffer.slice()  截取内存  浅拷贝
      buffer.toString()  转换成字符串
      buffer.length  buffer的字节长度
      buffer.fill()  填充buffer
      Buffer.isBuffer()  判断是否是buffer  在node中处理数据 有字符串和buffer共存的情况 为了保证不出错 一般都转成buffer
        表单传输数据 enctype="multipart/form-data" 上传文件的时候 会将文件转成buffer
        
        
 */
Buffer.prototype.split = function (sep) {
  sep = Buffer.isBuffer(sep) ? sep : Buffer.from(sep);//将数据全部换成buffer
  this.indexOf(sep);
  let current;
  let offset = 0;
  let result = [];
  while ((current = this.indexOf(sep, offset)) !== -1) {
    result.push(this.slice(offset, current));
    offset = current + sep.length;
  }
  result.push(this.slice(offset));
  return result;
  // let len = Buffer.from(sep).length;
  // let offset = 0;
  // let result = [];
  // let current;
  // while ((current = this.indexOf(sep, offset)) !== -1) {
  //   result.push(this.slice(offset, current));
  //   offset = current + len;
  // }
  // result.push(this.slice(offset));
  // return result;
}
const fs = require('fs');
const path = require('path');
fs.readFile(path.resolve(__dirname, 'note.md'), (err, data) => {
  console.log(data.split('你好'));

})

/**
     面试题：
         有一个数组  const arr=[[0],1,2,3]
         cosnt newArr=arr.slice(0,1) 截取第一项  浅拷贝
             newArr[0][0]=100
        问 原来arr中的第一项是多少?
         console.log(arr)  // [[100],1,2,3]
       答：因为slice是浅拷贝 截取的是内存空间 [0xfff,1,2,3] 所以修改newArr中的第一项 会影响原来的arr
   
 */
