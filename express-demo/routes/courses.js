const express = require('express')
const router = express.Router()


const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
]


router.get('/', (req, res)=> {
    res.send(courses)
})

// Creating new course
router.post('/', (req, res)=> {
    const result = validateCourse(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return; 
    }

    const course = {
        id: courses.length + 1, 
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

// Updating a course
router.put('/:id', (req, res)=> {
    const course = courses.find((c)=> c.id === parseInt(req.params.id))
    if(!course) {
        res.status(404).send('The course with the given ID was not found.')
        return
    }
        
    const result = validateCourse(req.body)
    if(result.error) {
        res.status(400).send(result.error.details[0].message)
        return 
    }

    course.name = req.body.name
    res.send(course)
})

router.delete('/:id', (req, res)=> {
    const course = courses.find((c)=> c.id === parseInt(req.params.id))
    if(!course) {
        res.status(404).send('The course with the given ID was not found.')
        return
    }
    const index = courses.indexOf(course)
    courses.splice(index, 1)
    res.send(course)
})


function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(course)
}

// Getting course by id
router.get('/:id', (req, res)=> {
    const course = courses.find((c) => c.id === parseInt(req.params.id))
    if(!course) {
        res.status(404).send('The course with the given ID was not found.') 
        return
    } else {
        res.send(course)
    }  
    
})

module.exports = router