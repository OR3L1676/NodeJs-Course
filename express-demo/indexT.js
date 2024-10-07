const express = require('express')
const app = express()
const Joi = require('joi')

app.use(express.json())
app.use(express.urlencoded({extended: true})) // gives us to push arrays and objects in the urlformat
app.use(express.static('public'))

const courses = [
    {id: 1, courseName: "math"},
    {id: 2, courseName: "science"},
    {id: 3, courseName: "biology"},
]

app.get('/', (req, res)=> {
    res.send('hello world')
})

app.get('/api/courses', (req, res)=> {
    res.send(courses.map((course)=> {
        return course.courseName
    }))
})

app.get('/api/courses/:id', (req, res)=> {
    const course = courses.find((course)=> course.id === parseInt(req.params.id))
    if(!course) res.status(404).send('The course with the given id was not found')
    res.send(course)
})

app.post('/api/courses', (req, res)=> {
    const course = {id: courses.length + 1, courseName: req.body.courseName}
    const schema = Joi.object({
        courseName: Joi.string().min(3).required()
    })
    const {error} = schema.validate(req.body)
    if(error) res.status(400).send(error.details[0].message)
    courses.push(course)
    res.send(course)
})

app.put('/api/courses/:id', (req, res)=> { 
    const course = courses.find((course)=> course.id === parseInt(req.params.id))
    if(!course) res.status(404).send('The course with the given id was not found')
    const schema = Joi.object({
        courseName: Joi.string().min(3).required()
    })
    const {error} = schema.validate(req.body)
    if(error) res.status(400).send(error.details[0].message)
    course.courseName = req.body.courseName
    res.send(course)
    })

const port = process.env.PORT || 3000;
app.listen(3000, ()=> {
    console.log(`listening on port ${port}...`);
})

