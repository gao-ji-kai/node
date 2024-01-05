new Promise((resolve, reject) => {
    resolve(100)
 }).then().then(data => {
    console.log(data)
 }, err => {
    console.log(err)
 })