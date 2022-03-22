const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

// get
    // Pagina principal
    router.get('/', (req, res) => {
        console.log("lala")
        res.render('index')
    })


module.exports = router