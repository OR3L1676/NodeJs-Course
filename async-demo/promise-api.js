// // const p = Promise.resolve({id: 1})
// const p = Promise.reject(new Error('Reason of rejection'))

// // p.then((result)=> {
// //     console.log(result);  
// // })
// p.catch((err)=> {
//     console.log(err);  
// })

const p1 = new Promise((resolve)=> {
    setTimeout(() => {
        console.log('Async operatoin 1...');
        resolve(1)
    }, 2000);
})
const p2 = new Promise((resolve)=> {
    setTimeout(() => {
        console.log('Async operatoin 2...');
        resolve(2)
    }, 2000);
})

Promise.race([p1, p2]).then((result)=> { // all, race
    console.log(result);  
}).catch((err)=> {
    console.log(err.message)
})