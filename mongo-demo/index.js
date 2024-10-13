const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground')
.then(()=> console.log('Connected to MongoDB...'))
.catch((err)=> console.log('Could not connect to MongoDB...', err))

const courseSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 5, maxlength: 255}, 
    category: {
        type: String, 
        required: true, 
        enum: ['web', 'mobile', 'network'],
        lowercase: true
    },
        author: String,
    tags: {
        type: Array, 
        validate: {
            validator: function(v) {
                return new Promise((resolve)=> {
                    setTimeout(() => {
                    const result  = v && v.length > 0
                    resolve(result)
                }, 1000);
                })
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublish: Boolean,
    price: { type: Number, 
        required: function() { return this.isPublish },
        min: 10, 
        max: 200,
        getter: (v)=> Math.round(v),
        setter: (v)=> Math.round(v)
    }
})

const Course = mongoose.model('Course', courseSchema)

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: 'Web', 
        author: 'Mosh',
        tags: ['frontend'],
        isPublish: true,
        price: 15
    })
    try {
        // await course.validate()
        const result = await course.save()
        console.log(result);
    }catch(ex) {
        for(field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }
}

async function getCourses() {
    // eq, en, gt, gte, lt, lte, in, nin
    // or and 

    const pageNumber = 2;
    const pageSize = 10;

   const courses = await Course
   .find({author: 'Mosh', isPublish: true})
    // .find({price: {$gte: 10, lte: 20}}) // find courses between $10-20
    // .find({price: {$in: [10, 20, 30]}}) // find courses $10 || $20 || $30 
    // .find({author: /^Mosh/}) // starts with mosh
    // .find({author: /Hamadani$/i}) // ends with hamadani
    // .find({author: /.*Mosh.*/i}) // contain mosh
    // .or([{author: 'Mosh'}, {isPublish: true}]) // find author-Mosh or ispublish-true
   .skip((pageNumber - 1) * pageSize)
   .limit(pageSize)
   .sort({name: 1})
    // .countDocuments()
   .select({name: 1, tags: 1})
   console.log(courses);
}

// update a course
async function updateCourse(id) {
    // const course = await Course.findById(id)
    // if(!course) return
    // course.set({ispublished: true, author: 'Another Author'})
    // const result = await course.save()
    // console.log(result);
    const result = await Course.updateMany({_id: id}, {
        $set: {isPublish: false, author: 'Mosh'}
    })
    console.log(result);
}

async function removeCourse(id) {
    // const result = await Course.deleteOne({_id: id})
    const course = await Course.findByIdAndDelete(id)
    console.log(course)
}

createCourse()
// getCourses()
// updateCourse('6703efe09f9389271fbf27cd')
// removeCourse('6703efe09f9389271fbf27cd')

