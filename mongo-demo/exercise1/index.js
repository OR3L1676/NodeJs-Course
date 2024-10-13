const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(()=> console.log('Connecting to MongoDB...'))
.catch((err)=> console.log('Failed to connect MongoDB...', err))

const courseSchema = new mongoose.Schema({
    id: String, 
    tags: [String],
    date: Date, 
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
    __v: Number
})

const Course = mongoose.model('Course', courseSchema)

async function getCourses() {
    const courses = await Course
        .find({isPublished: true, tags: 'backend'})
        .sort({ name: 1 })
        .select({name: 1, author: 1})
        return courses
}
async function getCourses2() {
    const courses = await Course
        .find({isPublished: true, tags: {$in: ['backend', 'frontend']}})
        .sort({ price: -1 })
        .select({name: 1, author: 1})
        return courses
}

async function getCourses3() {
    const courses = await Course
    .find({isPublished: true})
    .or([ {price: {$gte: 15}}, {name: /.*by.*/ }])
    .sort('-price')
    .select('name author price')
    return courses
}

async function run() {
    const courses = await getCourses()
    const courses2 = await getCourses2()
    const courses3 = await getCourses3()
    console.log(courses3);   
}


run()