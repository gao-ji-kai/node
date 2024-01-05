// module.exports = 'hello'

let c = { a: 1 }
setTimeout(() => {
    c.a++
}, 1000)
module.exports = c

