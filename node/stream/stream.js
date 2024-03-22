const fs = require('fs');
const EventEmitter = require('events');// 事件库 node自带的

class ReadStream extends EventEmitter {
    constructor(path, options) {
        super();
        this.path = path;// 读取的文件路径
        this.flags = options.flags || 'r';// 读取文件
        this.encoding = options.encoding || null;
        this.mode = options.mode || 0o666;// 权限位
        this.autoClose = options.autoClose || true;// 读取完毕后是否自动关闭文件  fs.close
        this.emitClose = options.emitClose || true;// 是否发射close事件  this.emit('close')
        this.start = options.start || 0;// 读取的起始位置
        this.end = options.end;
        this.highWaterMark = options.highWaterMark || 64 * 1024;// 控制读取的速率  字节单位 不写默认是64k 64*1024
        this.flowing = null;//是否是流动模式 默认是非流动模式
        // this.buffer = Buffer.alloc(this.highWaterMark);
        this.pos = this.start;

        // 这里是同步监听 用户绑定了data 会立刻触发这个回调
        this.on('newListener', (type) => {
            if (type === 'data') {
                this.flowing = true;
                this.read();//读取操作
            }
        });
        this.open()
    }
    destroy(err) {
        if (this.fd) {
            fs.close(this.fd, () => {
                this.emit('close');
            });
            return;
        }
        if (err) {
            this.emit('error', err);// 发射错误事件 需要继承事件库
        }

    }
    open() {// 异步的
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) {
                this.destroy(err);

            }
            this.fd = fd;
            this.emit('open', fd);
        });
    }
    //暂停
    pause() {
        this.flowing = false;
    }
    //恢复
    resume() {
        if (!this.flowing) {
            this.flowing = true;
        }
        this.read();
    }
    read() {
        // 如果没有fd  就等fd 执行完毕后再执行read
        if (typeof this.fd !== 'number') {
            // 如果用户多次执行open 只执行一次就好了
            return this.once('open', () => this.read());
        }

        // 文件已打开 可读取
        const buffer = Buffer.alloc(this.highWaterMark)
        const howMuchToRead = this.end ? Math.min(this.end - this.pos + 1, this.highWaterMark) : this.highWaterMark;
        fs.read(this.fd, buffer, 0, howMuchToRead, this.pos, (err, bytesRead) => {
            if (err) {
                return this.destroy(err);
            }
            if (bytesRead == 0) {
                this.emit('end');
                this.destroy()
            } else {
                this.pos += bytesRead;
                this.emit('data', buffer.slice(0, bytesRead));
                if (this.flowing) {
                    this.read()
                }

            }
        })

    }
    // 可读流和可写流之间的管道
    pipe(ws) {
        // 监控可读流中的数据 然后写入到可写流中
        this.on('data', (chunk) => {
            let flag = ws.write(chunk);
            if (!flag) {
                this.pause();
            }
        });
        // 全部写完了 
        ws.on('drain', () => {
            this.resume();
        });
        this.on('end', () => {
            ws.end('');
        });
    }
}


module.exports = ReadStream;