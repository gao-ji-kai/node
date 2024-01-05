
// generator函数实现原理 就是把一个函数分成多个case语句 一段一段去执行 通过指针来指向要执行的部分

function wrap(fn) {
    const _context = {
        next: 0,
        done: false,
        send: undefined,
        stop() {
            this.done = true
        }
    }

    return {
        next(value) {
            _context.send = value // 先赋值 再调方法
            let v = fn(_context)//执行函数 传递上下文
            return { value: v, done: _context.done }
        }
    }
}




function gen() {
    var a, b, c;
    return wrap(function gen$(_context) {
        //while (1) 标记走多次 不止一次
        while (1) switch (_context.prev = _context.next) { // 通过switch case来实现
            case 0:
                _context.next = 2;
                return 1;
            case 2:
                a = _context.sent;
                console.log(a);
                _context.next = 6;
                return 2;
            case 6:
                b = _context.sent;
                console.log(b);
                _context.next = 10;
                return 3;
            case 10:
                c = _context.sent;
                console.log(c);
            case 12:
            case "end":
                return _context.stop();
        }
    });
}


let it = gen()
console.log(it.next());// { value: 1, done: false }


// function* gen() {
//     let a = yield 1 // js执行是先走到等号右边   遇到yield就会暂停
//     console.log(a);
//     let b = yield 2 // 第二次next传递的参数会给上一次yield的返回值
//     console.log(b);
//     let c = yield 3
//     console.log(c);

// }