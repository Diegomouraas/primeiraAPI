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

        // Verificando se o formulario esta vazio
            if(req.body == undefined) {
                erros.push("Dados Invalidos")
            }else {
                
                // Verificando dados do Formulario
                    // Nome
                    if(!req.body.nome || req.body.nome == null || req.body.nome == undefined ||req.body.nome.length > 100){
                        erros.push("Nome Invalido")
                        console.log("Nome Invalido")
                    }

                    // CPF
                    if(!req.body.cpf || req.body.cpf == null || req.body.cpf == undefined || 
                        req.body.cpf.lenght > 11 || req.body.cpf.lenght == 0) {

                        erros.push("CPF invalido")
                        
                    }else{
                        // validando CPF
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

                        if(fistDigCpf == 10) {
                            fistDigCpf = 0
                        }else if(segDigCpf == 10) {
                            segDigCpf = 0
                        }

                        let digitoCalc = ((fistDigCpf * 10) + segDigCpf)
                        let digitoReal = (parseInt(req.body.cpf[9] * 10) + parseInt(req.body.cpf[10]))

                        if(digitoCalc == digitoReal){
                            console.log("CPF Verdadeiro")
                           
                        }else{
                            console.log("CPF Invalido ")
                            console.log(digitoCalc)
                            console.log(digitoReal)
                            erros.push("CPF Invalido")
                            
                        }
                    }

                    // Data de nascimento 
                    if(!req.body.dataNascimento || req.body.dataNascimento == null || req.body.dataNascimento == undefined){
                        erros.push("Data de Nascimento invalida")
                        
                    } else {
                        // Validando data de nascimento

                        let dia = parseInt(req.body.dataNascimento[0] * 10) + parseInt(req.body.dataNascimento[1])

                        let mes = parseInt(req.body.dataNascimento[2] * 10) + parseInt(req.body.dataNascimento[3])

                        let ano = parseInt(req.body.dataNascimento[4] * 1000) + parseInt(req.body.dataNascimento[5] * 100) 
                                + parseInt(req.body.dataNascimento[6] * 10) + parseInt(req.body.dataNascimento[7])

                        const date = new Date();

                        if(dia < 1 || dia > 31 || mes < 1 || mes > 12 || ano < 1900 || ano > date.getFullYear()){
                            erros.push("Data de Nascimento invalida")
                            console.log("Data de Nascimento invalida")
                        } else {
                            console.log("data de Nascimento: ", dia, "/", mes, "/", ano)
                        }
                    }

                }

        // Arquivo
            if(erros.length > 0) {
                res.send("Dados Invalidos")
            } else {
                const dadosDoUsuario = {
                    nome: req.body.nome,
                    cpf: req.body.cpf,
                    dataNascimento: req.body.dataNascimento
                }

                new Usuarios(dadosDoUsuario).save().then(() => {
                    res.send("Usuario cadastrado!")
                }).catch((err) => {
                    res.send("Erro ao Cadastrar Usuarios!")
                    console.log("Erro no cadastro: " + err)
                })
            }
            
    })



module.exports = router