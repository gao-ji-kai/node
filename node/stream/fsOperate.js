// 文件常用的api


/*
    fs.stat 判断文件类型
        isFile() 是否是文件
        isDirectory() 是否是文件夹
    fs.unlink 删除文件
    fs.mkdir 创建文件夹
    fs.rmdir 删除文件夹 非空文件夹删不掉 
    fs.readdir 读取儿子级别的目录 就比如a文件夹下有b文件夹 c文件夹 读取a文件夹下的所有文件

 
 */

// 删除某个文件夹

const { dir } = require('console');
const fs = require('fs');
const path = require('path');
;
// 判断文件类型
fs.stat(path.resolve(__dirname, 'a'), (err, statObj) => {
    console.log(stat.isDirectory());// 判断是不是文件夹
    console.log(stat.isFile());// 判断是不是文件
    console.log(stat.size);// 文件大小
    console.log(stat);
    if (stat.isFile()) {
        fs.unlink(path.resolve(__dirname, 'a'), (err) => {
            console.log('删除成功');
        })
    } else {
        fs.rmdir(path.resolve(__dirname, 'a'), (err) => {
            console.log('删除成功');
        })
    }
})

// 同步删除

function rmdirSync(directory) {
    const statObj = fs.statSync(path.resolve(__dirname, directory));
    if (statObj.isFile()) {
        //文件直接移除,文件夹需要递归删除
        fs.unlinkSync(directory);
    } else {
        let dirs = fs.readdirSync(directory);
        dirs = dirs.map(dir => readdirSync(path.join(directory, dir)));
        fs.rmdirSync(directory)
    }
}
rmdirSync('a')

//异步删除 树 树的遍历方式有两种 (层序遍历 深度遍历(先序 中序 后序))

// webpack 异步串行 异步并行 

function rmdir(directory, cb) {
    fs.stat(directory, (err, statObj) => {
        if (statObj.isFile()) {
            fs.unlink(directory, cb)
        } else {
            fs.readdir(directory, (err, dirs) => {
                const dirs = dirs.map(dir => path.join(directory, dir));
                let index = 0;
                function next() {
                    // 递归删除
                    if (index === dirs.length) return fs.rmdir(directory, cb);
                    dir = dirs[index++];
                    // 删除完毕后继续删除下一个
                    rmdir(dir, next);
                }
                next();

            })
        }


    })


}

// 上述代码优化
function rmdir(directory, cb) {
    fs.stat(directory, (err, statObj) => {
        if (statObj.isFile()) {
            fs.unlink(directory, cb)
        } else {
            fs.readdir(directory, (err, dirs) => {
                if (dir.length === 0) {
                    return fs.rmdir(directory, cb);
                }

                const dirs = dirs.map(dir => path.join(directory, dir));

                function done() {
                    if (++index === dirs.length) {
                        fs.rmdir(directory, cb)
                    }
                }

                // 并发删除
                dirs.forEach(dir => {
                    rmdir(dir, () => {
                        fs.rmdir(directory, done);
                    })
                })


            })
        }


    })


}


// 将代码改成promise
function rmdir(directory, cb) {
    return new Promise((resolve, reject) => {
        fs.stat(directory, (err, statObj) => {
            if (statObj.isFile()) {
                fs.unlink(directory, resolve)
            } else {
                fs.readdir(directory, (err, dirs) => {
                    const dirs = dirs.map(dir => rmdir(path.join(directory, dir)));
                    Promise.all(dirs).then(() => {
                        fs.rmdir(directory, resolve)
                    })

                })
            }
        })
    })

}

//async awit
const fsPromises = require('fs/promises');
async function rmdir(directory, cb) {
    const statObj = await fsPromises.stat(directory)
    if (statObj.isFile()) {
        return fsPromises.unlink(directory)
    } else {
        let dirs = await fsPromises.readdir(directory)
        dirs = dirs.map(dir => rmdir(path.join(directory, dir)));
        await Promise.all(dirs)
        return fs.rmdir(directory)

    }

}

rmdir('a').then(() => {
    console.log('删除成功');
})


rmdir('a', () => {
    console.log('删除成功');
})

// 层序遍历来删除目录 