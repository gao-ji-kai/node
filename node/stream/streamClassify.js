const { Readable, Writable, Duplex, Transform } = require('stream');

// 双工流  能读也能写  内部需要实现 _read 和 _write

class MyDuplex extends Duplex {
    constructor() {
        super();
        this.data = ''
    }
    _read() {
        // 读走这里
        this.push(this.data);// 读取到的数据放入缓存区
        this.push(null);// 没有放入数据 所以没有触发data
    }
    _write(data, encoding, callback) {
        // 写入走这里
        console.log('写入', data);
        this.data = data
    }
}

const myDuplex = new MyDuplex;

myDuplex.on('data', (data) => {
    console.log('读取', data);
});
myDuplex.on('end', () => {
    console.log('end');
});
myDuplex.write('hello');

// 转化流 (一定是双工流) 可读可写  压缩、加密都会应用

/*
    node中可以实现进程间通信  通信就可以通过流来实现
        进程通信  使用以下这三种方法
            process.stdin  标准输入 用户输入的内容 会触发此方法 (用户在命令行输入的命令 会触发此方法)
                process.stdin.on('data', () => {})  读取用户的输入 

            process.stdout 标准输出  向控制台输出内容 底层和console.log一样
                process.stdout.write('hello')  向控制台输出内容
            
            process.stdin.pipe(转化操作)  通过管道流的方式 读取用户输入的内容并输出到控制台

            process.stderr 标准错误输出  向控制台输出错误信息 底层和console.error一样
 */

class MyTransform extends Transform {
    _transform(chunk, encoding, callback) {// 参数是可写流的参数  
        //将处理后的结果 可以通过push方法 传给可读流当中
        this.push(chunk.toString().toUpperCase()); // 将读取到的内容转化为大写
        callback();
    }
}
const myTransform = new MyTransform;
process.stdin.pipe(myTransform).pipe(process.stdout);

const zlib = require('zlib'); // 压缩模块 node中内置的模块

/*
    zlib中自带的方法
        zlib.createGzip()  压缩
        zlib.createGunzip()  解压


 */

const fs = require('fs'); // gizp 将重复的内容尽可能替换 重复率越高 压缩率越高
const rs = fs.createReadStream('./1.txt');
const ws = fs.createWriteStream('./1.txt.gz');
rs.pipe(zlib.createGzip()).pipe(ws);// 读取文件 通过gzip压缩 写入文件

//加密
const crypto = require('crypto'); // 加密模块 node中内置的模块
const md5 = crypto.createHash('md5');// 创建一个md5的加密方式
md5.setEncoding('base64');// 设置编码格式

/*
    加密 和摘要不一样  (加密表示可逆 摘要是不可逆的)
    典型的摘要算法  md5(不可逆)  sha1  sha256  sha512
        md5特点   
            1.不可逆  
            2.相同的内容加密后的结果是一样的  
            3.不同的内容加密后的结果是不一样的(雪崩效应)
            4.不同内容加密后的结果长度是一样的
 */


/*
    crypto中自带的方法
        crypto.createHash()  摘要算法
        crypto.createCipher()  加密
        crypto.createDecipher()  解密
 */

console.log(crypto.createHash('md5').update('qaz').update('xc').digest('base64'));// base64  16进制  32进制  64进制 8LKAXXlt9E6uN9eigBonkQ== 加密后的结果