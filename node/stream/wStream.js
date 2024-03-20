const fs = require('fs');
const EventEmitter = require('events');

class WriteStream extends EventEmitter {


    constructor(path, options) {
        super();
        this.path = path;
        this.flags = options.flags || 'w';
        this.encoding = options.encoding || 'utf8';
        this.mode = options.mode || 0o666;
        this.autoClose = options.autoClose || true;
        this.emitClose = options.emitClose || true;
        this.start = options.start || 0;
        this.highWaterMark = options.highWaterMark || 16 * 1024;

        this.cache = []; // 缓存区  用链表实现的队列 从而将多次写入变为顺序写入 除了第一次写入 其他的写操作 都会放到该队列中
        this.writing = false; // 是否正在写入  默认情况下  没有调用过write
        this.needDrain = false; // 是否需要触发drain事件 只有写入的个数 达到highWaterMark时 才会触发drain事件
        this.length = 0; // 缓存区的字节长度 默认情况下  缓存区的长度是0
        this.offset = this.start; // 写入的偏移量 记录写入的位置

        this.open(); // 打开文件
    }
    destroy(err) {
        if (err) {
            return this.emit('error', err);
        }
    }
    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) return this.destroy(err);
            this.fd = fd;
            this.emit('open', fd);
        });
    }
    write(chunk, encoding = 'utf8', cb = () => { }) {
        // 这是 拿不到fd  需要 打开文件后才能拿到fd

        Buffer.isBuffer(chunk) ? chunk : chunk = Buffer.from(chunk, encoding);
        this.length += chunk.length;

        //写入的个数 超过约定的个数了 
        let res = this.length >= this.highWaterMark;
        this.needDrain = res;// 只有达到预期 最后都写入完毕 触发drain事件

        if (!this.writing) {
            // 需要将本次内容写入到文件中 
            this.writing = true
            this._write(chunk, encoding, cb)
        } else {
            // 将内容放到缓存区中
            console.log('缓存区');
            this.cache.push({
                chunk,
                encoding,
                cb
            })
            
        }
        return !res
    }
    //真正的写入
    _write(chunk, encoding, cb) {
        if(typeof this.fd !== 'number'){
            return this.once('open', () => this._write(chunk, encoding, cb))
        }
        console.log(this.fd,'第一次');
    }
}
module.exports = WriteStream;