function authentic(req, res, next) {
    console.log('Authenticating...')
    next()
}

module.exports = authentic