const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground')
.then(()=> console.log('Connected to MongoDB...'))
.catch((err)=> console.log('Could not connect to MongoDB...', err))

const courseSchema = new mongoose.Schema({
    name: String, 
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublish: Boolean
})

const Course = mongoose.model('Course', courseSchema)

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublish: true
    })
    
    const result = await course.save()
    console.log(result);
}

async function getCourses() {
    // eq, en, gt, gte, lt, lte, in, nin
    // or and 
   const courses = await Course
    // .find({author: 'Mosh', isPublish: true})
    // .find({price: {$gte: 10, lte: 20}}) // find courses between $10-20
    // .find({price: {$in: [10, 20, 30]}}) // find courses $10 || $20 || $30 
   .find({author: /^Mosh/}) // starts with mosh
   .find({author: /Hamadani$/i}) // ends with hamadani
   .find({author: /.*Mosh.*/i}) // contain mosh
    // .or([{author: 'Mosh'}, {isPublish: true}]) // find author-Mosh or ispublish-true
   .limit(10)
   .sort({name: 1})
   .select({name: 1, tags: 1})
   console.log(courses);
}

// createCourse()
getCourses()

