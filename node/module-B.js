const a = require('./module-A.js')
console.log(a, 'b'); // 因为 a没有加载完 所以打印的是空对象{}


module.exports = 'module-B'