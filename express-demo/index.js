const config = require('config')
const morgan = require('morgan')
const helmet = require('helmet')
//==============================
const Joi = require('joi')
const courses = require('./routes/courses')
const homepage = require('./routes/homepage')
const express = require('express')
const app = express()

const logger = require('./logger')
const authentic = require('./authentication')

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(helmet())
app.use('/api/courses', courses)
app.use('/', homepage)


//Configuration
console.log('Aplication Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));


if(app.get('env') === 'development') {
    app.use(morgan('tiny'))
    console.log('Morgan enabled...')
}

// app.get()
// app.post()
// app.put()
// app.delete()

app.use(logger)

app.use(authentic)


// PORT
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))