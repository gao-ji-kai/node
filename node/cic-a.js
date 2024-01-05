// module.exports 的特点 就是可以导出对象 可以使用引用类型的特点来解决循环引用的问题


let moduleB
module.exports = {
    saveModule(module) {
        moduleB = module
    },
    fn() {
        moduleB.use()// 在a中使用b
    },
    use() {
        console.log('moduleB use moduleA');
    }

}
