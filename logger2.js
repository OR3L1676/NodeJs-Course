const EventEmitter = require('events')

class Logger2 extends EventEmitter {
    log2(arg) {
        console.log(arg)
        this.emit('messageLogged', {id: 1, url: 'https://'})
    }
}

module.exports = Logger2