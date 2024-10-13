const express = require('express')
const router = express.Router()
const Joi = require('joi')
const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10,
    }
})

const Genre = new mongoose.model('Genre', genreSchema)

// validation function()
function validationGenre(req) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(req) 
}

// Get a genres
router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find().select({ name: 1 });
        res.send(genres);
    } catch (err) {
        res.status(500).send('Something went wrong');
    }
});


// Get a genre by id
router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) {
            return res.status(404).send('We cannot find the genre with the given ID');
        }
        res.send(genre);
    } catch (err) {
        res.status(400).send('Invalid ID format');
    }
});


// Post a genre
router.post('/', async (req, res) => {
    // Validate the incoming request
    const { error } = validationGenre(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Create a new genre document
    let genre = new Genre({
        name: req.body.name
    });

    // Try to save the genre and handle possible errors
    try {
        const savedGenre = await genre.save();
        res.send(savedGenre);
    } catch (err) {
        // Send error messages related to validation on save (like schema rules)
        const errorMessages = Object.values(err.errors).map(e => e.message);
        res.status(400).send(errorMessages.join(', '));
    }
});


// Put (update) a genre
router.put('/:id', async (req, res) => {
    // Validate the request body first
    const { error } = validationGenre(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        // Update the genre by ID and return the updated document
        const genre = await Genre.findByIdAndUpdate(
            req.params.id, 
            { name: req.body.name }, // Update only the `name` field
            { new: true } // Return the updated document
        );
        // Check if the genre with the given ID exists
        if (!genre) {
            return res.status(404).send('The genre with the given ID was not found.');
        }
        // Send the updated genre
        res.send(genre);
    } catch (err) {
        // Handle any other errors
        res.status(500).send('Something went wrong.');
    }
});


// Delete a genre
router.delete('/:id', async (req, res) => {
    try {
        const genre = await Genre.findByIdAndDelete(req.params.id);
        // Check if the genre with the given ID exists
        if (!genre) {
            return res.status(404).send('The genre with the given ID was not found.');
        }
        // Send the deleted genre as the response
        res.send(genre);
    } catch (err) {
        // Handle any potential errors, such as an invalid ObjectID format
        res.status(400).send('Invalid ID or something went wrong.');
    }
});


module.exports = router