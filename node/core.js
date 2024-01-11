// node中和浏览器的差异

// node中的全局对象 global global中的属性可以直接在任何模块下访问

// 有一属性不在global上 但是可以直接访问 export require module.exports __dirname __filename



/*
    process
        platform 平台  window  linux  Mac  
            使用场景:写一个前端工具 需要系统配置文件  可以通过process.platform来判断当前系统
        cwd  current working directory 当前工作目录   会随着命令执行的目录变化而变化
        env 环境变量 
            使用场景:开发时需要用到的环境变量 不用环境请求不用的接口
            在命令行中设置环境变量  window：set NODE_ENV=development  MAC： export NODE_ENV=development
            在node中获取环境变量 process.env.NODE_ENV
        argv  运行参数  默认两个参数 
            node core.js --port 3000 --config xxx
            argv[0]  node的执行文件
            argv[1]  当前执行的文件
            argv[2]  --port
            argv[3]  3000
            argv[4]  --config
            argv[5]  xxx
        一般情况下我们会使用第三方模块来处理参数 commander yargs minimist
            自己编写脚手架 commander
            const program = require('commander');
            const prkage = require('./package.json');
            program.parse();
            program.usage('[options] <file ...>')  <>必选参数  []可选参数
                .option('-d, --debug', 'output extra debugging')
                .option('-s, --small', 'small pizza size')
                .option('-p, --pizza-type <type>', 'flavour of pizza');
            program.command('create').action(args => {
            
            })
             program
                .version('0.1.0')
                .option('-p, --peppers', 'Add peppers')
                .option('-P, --pineapple', 'Add pineapple')
                .option('-b, --bbq', 'Add bbq sauce')
                .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
                .parse(process.argv);
        
        nextTick (node中实现的微任务) setImmediate(宏任务) 10以上的版本 和浏览器一致
            process.nextTick(function(){
            
            })

            我们可以使用nextTick来实现一个异步方法的同步调用 
            timer 定时器
            pending callbacks  上一轮没有执行完的回调
            idle, prepare  内部使用
            poll 轮询 文件读写回调
            check 执行setImmediate的回调
            close callbacks socket.close

    当主栈执行完毕后 会按照顺序依次执行 timer(setTimeout) ->poll(fs方法) ->check(setImmediate)
    当代码执行完毕后 会从timer ->poll  检测poll里面是否执行完毕了 如果执行完毕了 就会执行check里面的方法  如果没有就继续等待

    node中只是将宏任务进行了划分 划分到了不同的宏任务队列
    微任务也是在每个宏任务执行完毕后 才清空

    process.nextTick 并不是微任务  每个宏任务执行完毕后 会执行nextTick  




*/


// Buffer
// setImmediate
// setTimeout

// console.dir(global, { showHidden: true });
console.dir(Object.keys(process, { showHidden: true }));