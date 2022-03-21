const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
require ('../models/Users')
const Usuarios = mongoose.model('usuarios');

// get
    router.get('/', (req, res) => {
        console.log("lala")
        res.render('index')
    })

// posts   
    router.post('/users/newreg', (req, res) => {
        console.log(req.body.cpf[1])
        var erros = []; // array que armazena os erros

        if(req.body == undefined) {
            res.send("Escreveu errado mermao")
        }else if(!req.body.cpf || req.body.cpf == null || req.body.cpf == undefined || 
            req.body.cpf.lenght > 11 || req.body.cpf.lenght == 0) {

            erros.push("CPF invalido")
            res.redirect('/in')
        }else{
            let fistDigCpf = ((
            (req.body.cpf[0] * 1) +
            (req.body.cpf[1] * 2) +
            (req.body.cpf[2] * 3) +
            (req.body.cpf[3] * 4) +
            (req.body.cpf[4] * 5) +
            (req.body.cpf[5] * 6) +
            (req.body.cpf[6] * 7) +
            (req.body.cpf[7] * 8) +
            (req.body.cpf[8] * 9) ) % 11)

            let segDigCpf = ((
                (req.body.cpf[0] * 0) +
                (req.body.cpf[1] * 1) +
                (req.body.cpf[2] * 2) +
                (req.body.cpf[3] * 3) +
                (req.body.cpf[4] * 4) +
                (req.body.cpf[5] * 5) +
                (req.body.cpf[6] * 6) +
                (req.body.cpf[7] * 7) +
                (req.body.cpf[8] * 8) +
                (req.body.cpf[9] * 9) ) % 11)

            let digitoCalc = ((fistDigCpf * 10) + segDigCpf)
            let digitoReal = (parseInt(req.body.cpf[9] * 10) + parseInt(req.body.cpf[10]))

            if(digitoCalc == digitoReal){
                console.log("CPF Verdadeiro")
                res.send("CPF Verdadeiro")
            }else{
                console.log("CPF Invalido ")
                console.log(digitoCalc)
                console.log(digitoReal)

                res.redirect('/in')
            }

            
        }


        // validação dos parametros
            /*if(!req.body.nome || req.body.nome == null || req.body.nome == undefined) {
                erros.push("Digite um nome valido")
            }

            if(!req.body.cpf || req.body.cpf == null || req.body.cpf == undefined || 
                req.body.cpf.lenght > 11 || req.body.cpf.lenght == 0) {

                erros.push("CPF invalido")
            }else{
                let fistDigCpf = (2314)
            }
            
            let rg_calc = (req.body.cpf)

        

            

            if(!req.body.cpf || req.body.cpf == null || req.body.cpf == undefined) {
                erros.push("CPF invalido")
            }*/
    })



module.exports = router