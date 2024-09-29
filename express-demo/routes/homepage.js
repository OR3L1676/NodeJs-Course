const express = require('express')
const router = express.Router()

router.get('', (req, res)=> {
    res.render('index', {title: "My Express App", message: "H1 google translate is the best"})
})

module.exports = router