const EventEmitter = require('events')

var url = 'http://mylogger.io/log'

class Logger extends EventEmitter{
    log(message) {
        console.log(message)
        //Raize an event
        this.emit('messageLogged', {id: 1, url: 'https://'})
    }
    
}



module.exports = Logger;


