
const request = require('./request');
function handleRequest(req, res) {
    let context = {
        request: Object.create(request),
    }
    context.request[Math.random()] = Math.random();
    console.log('==============================');
    console.log(context.request);//{ id: 1 }
    console.log('==============================');
}
handleRequest()
handleRequest()
handleRequest()
