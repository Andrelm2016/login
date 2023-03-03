const express = require("express");
const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database:  "markconsult",
});

app.use(express.json());

app.post("/register", (res, req) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE email = ?", [email],
    (err, response) => {
        if (err) {
            res.send(err);
        }
        if (result.length == 0) {
            bcrypt.hash(password, saltRounds, (err, hash) => {

                db.query("INSERT INTO users (email, password) VALUES ( ?, ?)", [email, hash], (err, result) => {
                    if (err) {
                        res.send(err);
                    }
    
                    res.send({msg: "Cadastrado com sucesso"});
                });
                
            })
  

        }else{
            res.send({msg: "Usuário já cadastrado."})
        }
    });
});

    app.post("/login", (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password],
        (err, result) =>{
            if(err){
                res.send(err);
            } 
            if(result.length > 0){
                res.send({msg: "Usuário logado com sucesso"})
            }else{
                res.send({msg: "Usuário não encontrado"})
            }

        }
        )

    });

app.listen(3001, () => {
    console.log("Rodando na porta 3001")
});