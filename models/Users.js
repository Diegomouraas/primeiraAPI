const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Usuario = new Schema({
    nome: {
        type: String,
        required: true
    },
   
    cpf: {
        type: Number,
        required: true
    },
    
    dataNascimento: {
        type: Number,
        required: true
    }
    

})

mongoose.model("usuarios", Usuario)