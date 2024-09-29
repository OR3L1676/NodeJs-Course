const express = require('express')
const router = express.Router()
const Joi = require('joi')


const genres = [
    {id: 1, genreName: 'action'},
    {id: 2, genreName: 'drama'},
    {id: 3, genreName: 'horror'}
]

// validation function()
function validationGenre(req) {
    const schema = Joi.object({
        genreName: Joi.string().min(3).required()
    })
    return schema.validate(req) 
}

// Get a genres
router.get('/', (req, res)=> {
    res.send(genres)
})

// Get a genre by id
router.get('/:id', (req, res)=> {
    const genre = genres.find((g)=>{
       return g.id === parseInt(req.params.id)
    })
    if(!genre) {
        res.status(404).send('We cant found the genre by the given id')
        return
    } else{
        res.send(genre)
    }
})

// Post a genre
router.post('/', (req, res)=> {
    const result = validationGenre(req.body)
    if(result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }
    const genre = {
        id: genres.length + 1,
        genreName: req.body.genreName
    }
    genres.push(genre)
    res.send(genre)
})

// put a genre
router.put('/:id', (req, res)=> {
    const genre = genres.find((g)=> g.id === parseInt(req.params.id))
    if(!genre) { 
        res.status(404).send('We cant found the genre by the given id')
        return
    }
    const result = validationGenre(req.body)
    if(result.error) {
        res.status(400).send(result.error.details[0].message)
        return 
    }
    genre.genreName = req.body.genreName
    res.send(genre)
})

// delete a genre
router.delete('/:id', (req, res)=> {
    const genre = genres.find((g)=> g.id === parseInt(req.params.id))
    if(!genre) {
        res.status(404).send('We cant found the genre by the given id')
        return
    }
    const index = genres.indexOf(genre)
    genres.splice(index, 1)
    res.send(genre)
})

module.exports = router