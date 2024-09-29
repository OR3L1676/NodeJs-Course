
const Logger2 = require('./logger2')
const logger = new Logger2()

logger.on('messageLogged', (arg)=> {
    console.log("Listenter hello", arg)
})

logger.log2('cookies is tasty')

