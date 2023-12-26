const fs = require('fs');
// 延迟方法
const Promise = require('./promise');
const path = require('path');

function readFile(url) {
    // 延迟方法
    let dfd = Promise.deferred()
    // return new Promise((resolve, reject) => { 
    fs.readFile(url, 'utf8', function (err, data) {
        if (err) return dfd.reject(err)
        dfd.resolve(data)
    })
    // })
    return dfd.promise
}

readFile(path.resolve(__dirname, 'name.txt')).then(data => {
    console.log(data);
}, err => {
    console.log(err);
})