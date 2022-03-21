const express = require('express');
const session = require('express-session')
const mongoose = require('mongoose');
const reqIn = require('./routes/in');

const app = express();

// Configuração
    // view engine
        app.set('view engine', 'ejs')
        app.set('views', 'pages')
    // Sessão
        app.use(session({
            secret: "lalala",
            resave: true,
            saveUninitialized: true
        }))
    // Middlewares
        app.use(express.json()) 
        app.use(express.urlencoded({ extended: true }))

        app.use((req, res, next) => {
            next();
        })
    // Mongoose
        mongoose.connect("mongodb://localhost/8081").then(() => {
            console.log("Connected to Mongoose")
        }).catch(err => {
            console.log("Error trying to connect to Mongoose: " + err)
        })

// Rotas
    app.use('/in', reqIn);

// Outros
    const port = 8081;
    app.listen(port, () => {
        console.log("Listening at " + port);
    })
