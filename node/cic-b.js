
let moduleA
module.exports = {
    saveModule(module) {
        moduleA = module
    },
    fn() {
        moduleA.use()// 在b中使用a
    },
    use() {
        console.log('moduleA use moduleB');
    }
}