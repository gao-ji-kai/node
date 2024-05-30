const net = require('net');

const server = net.createServer((socket) => {

    // http是纯文本协议 通过换行符来分割数据 (有缺陷)
    // Host host  区分大小写问题
    // const arr = []
    // socket.on('data', (chunk) => {
    //     arr.push(chunk);
    // });

    // socket.on('end', () => {
    //     console.log(Buffer.concat(arr).toString());
    // });
    socket.write(`HTTP/1.1 200 ok
Content-Length: 3
Content-Type: text/plain


gjk
`);

    socket.end();

});

server.on('error', (err) => {
    throw err;
})

server.listen(8124, () => {
    console.log('server bound');
});