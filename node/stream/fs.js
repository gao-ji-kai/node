const fs = require('fs')
const path = require('path')

// 希望将文件拷贝一份到另一个文件夹中

/*
    1.读取文件是读取的文件不存在会报错
    2.写入时  如果文件不存在会自动创建文件，如果存在则会覆盖

    文件的读写 
     读取数据就是往内存中写入
     写入数据就是从内存中读取到文件中
    内存空间是有限的   读取大文件时  会造成内存溢出
    读取和写入小文件(64k以下的文件) 使用fs.readFile、fs.writeFile没问题 

    读取和写入大文件 fs.readFile、fs.writeFile不可以 
    大文件处理  手动读取的方式(node中提供的 )

 */

// 小文件读取和写入
// fs.readFile(path.resolve(__dirname, 'test.md'), (err, data) => {
//     if (err) return console.log(err)
//     console.log(data);//<Buffer 31 32 33 33 35 35 35>

//     // 写入文件
//     fs.writeFile(path.resolve(__dirname, 'copy.md'), data, (err) => {
//         if (err) return console.log(err)
//         console.log('写入成功')
//     })
// })

// 大文件读取和写入

// 手动打开文件 进行读取
/*
    fs.open (path, flags, callback)
        path: 文件路径
        falgs 标识参数 指打开文件的目的 不同参数代表不同的含义 
                 r 打开文件是读取文件
                 w 打开文件是写入文件
                 a 打开文件是追加写入文件
                 r+ 如果文件不存在会报错 具备读取和写入的功能
                 w+ 如果文件不存在会自动创建文件 具备读取和写入的功能

        0o666  文件的权限 
        二进制的组合:权限组合  1用户的执行操作  2用户的写入操作  4用户的读取操作 进行位运算
        chmode -R 777  777 代表所有用户都可以读写执行
        001 | 010  按位或可以将权限组合起来 011 
        010 
        100

 */
const buf = Buffer.alloc(3);
function copy(source, target, cb) {
    fs.open(source, 'r', (err, fd) => {
        if (err) return cb(err)
        // fd 文件描述符 linux 中的一个标识符 number类型
        /*
            fs.read(fd, buffer, offset, length, position, callback)
                fd:读取的文件
                buffer:读取的数据存放的位置
                offset:buffer的偏移量 也就是从buffer的哪个位置开始写入数据
                length:读取的长度
                position:读取的位置
                callback(err, bytesRead, buffer)
                bytesRead:读到的个数
         */
        // 将这个文件中的数据读取到buffer中 从buffer的第0个开始写入 写入三个 读取文件的位置是0

        fs.open(target, 'w', (err, wfd) => {
            let readPosition = 0;
            let writePosition = 0;

            function close() {
                let i = 0;
                function done() {
                    if (++i === 2) {
                        return cb()
                    }
                }
                fs.close(fd, done);
                fs.close(wfd, done);
            }
            function next() {
                fs.read(fd, buf, 0, 3, readPosition, (err, bytesRead, buffer) => {
                    if (err) return cb(err)
                    if (bytesRead === 0) {
                        return close()
                    } else {
                        // bytesRead: 读取的个数 
                        console.log(buf);//打开文件后 可以自己决定读取文件的位置
                        readPosition += bytesRead
                        // 写入操作
                        fs.write(wfd, buf, 0, bytesRead, writePosition, (err, bytesWritten, buffer) => {
                            if (err) return cb(err)
                            writePosition += bytesWritten
                            console.log('写入成功');
                            next()
                        })
                    }
                })
            }
            next()
        })
    })
}
copy(path.resolve(__dirname, 'test.md'), path.resolve(__dirname, 'copy.md'), () => {
    console.log('拷贝成功');
})

// node中的流 可以控制速度 、可决定是否继续读取或写入  gulp
// gulp ->转化成 css ->前缀处理 ->压缩 ->合并 ->输出 (控制速率 防止淹没可用内存)

// 文件流 fs模块 

