
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

//合并buffer
