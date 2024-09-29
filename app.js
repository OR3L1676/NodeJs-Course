// const path = require('path')
// const pathObj = path.parse(__filename)

// console.log(pathObj);


// const os = require('os')
// console.log(os.freemem())



// const fs = require('fs')
// // const files = fs.readdirSync('./')
// // console.log(files);

// const files1 = fs.readdir('./', function(err, files) {
//     if (err) console.log('Error', err);
//     else console.log('Result', files);   
// })
// console.log(files1);

const EventEmitter = require('events')

const Logger = require('./logger')
const logger = new Logger() 

//Register a listener
logger.on('messageLogged', (arg)=> {
    console.log("Listener called", arg)
})
logger.log('message')



// const loggin = new EventEmitter()

// loggin.on('tactics', (arg)=> {
//     console.log(arg.data)
// })

// loggin.emit('tactics', {data: 'this is the best data'})
