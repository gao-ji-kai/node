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
        dirs = dirs.map(dir => path.resolve(directory, dir));
        fs.rmdirSync(directory)
    }
}
rmdirSync('a')