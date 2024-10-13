const config = require('config')

//==============================

const genres = require('./routes/genres')
const homepage = require('./routes/homepage')
const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost/genres')
.then(()=> console.log('Connecting to MongoDB'))
.catch((err)=> console.error('Failed to connect MongoDB', err))

const authentic = require('./authentication')

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use('/api/genres', genres)
app.use('/', homepage)


//Configuration
console.log('Aplication Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

app.use(authentic)


// PORT
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))