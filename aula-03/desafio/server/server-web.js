const express = require('express');

const hbs = require('hbs');

const bodyParser = require("body-parser");

const jwt = require('jsonwebtoken');

const app = express();

const request = require('request');

const secretKey = "equipeA";

const {
    getAll,
    addAluno,
    findByEmail,
    deleteByEmail,
    updateAluno
} = require('../util/alunos_util');

app.use(bodyParser.json());

let alunos = getAll();

urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

app.use(express.static(__dirname + '/../public'));

hbs.registerPartials(__dirname + '/../views/partials');

app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.post('/mensagem', (req, res) => {
    if (!req.body) return res.status(400).send()
    let usuario = req.body;
    let aluno = findByEmail(usuario.email);

    if (!aluno) return res.status(404).send();

    if ((usuario.email === aluno.email) && (usuario.senha === aluno.senha)) {
        // jwt.sign(
        //     { usuario }, secretKey, (err, token) => {
        //         res.json({ token });
        //     }
        // );
        request('http://localhost:3000/api/alunos', (error, res, body) => {
            if (res.statusCode === 200) {
                alunos = JSON.parse(body);
            } else {
                res.status(404).send();
            }
        });
        res.render('lista.hbs', {
            alunos
        });
    } else {
        res.status(400).json({ msg: "Acesso negado" });
    }
});


app.get('/', (req, res) => {
    res.render('index.hbs', {
        alunos
    });
});

// app.get('/api', (req, res) => {
//     res.json({msg: 'Seja bem vindo a API'});
// });

// app.get('/api/alunos', (req, res) => {
//     let alunos = getAll();
//     res.send({ alunos });
// });

// app.post('/api/login', (req, res) => {
//     if (!req.body) return res.status(400).send()
//     let usuario = req.body;
//     let aluno = findByEmail(usuario.email);

//     if (!aluno) return res.status(404).send();

//     if ((usuario.email === aluno.email) && (usuario.senha === aluno.senha)) {
//         jwt.sign(
//             { usuario }, secretKey, (err, token) => {
//                 res.json({ token });
//             }
//         );
//     } else {
//         res.status(400).json({ msg: "Acesso negado" });
//     }
// });

// app.post('/api/alunos', (req, res) => {
//     if (!req.body.nome) {
//         return res.status(404).send();
//     }
//     let aluno = {
//         nome: req.body.nome,
//         email: req.body.email,
//         senha: req.body.senha,
//         telefone: req.body.telefone,
//         endereco: req.body.endereco
//     };

//     let novoAluno = addAluno(aluno);
//     if (!novoAluno) {
//         return res.status(400).send('Erro ao adicionar aluno');
//     }
//     res.send(novoAluno);
// });

// app.delete('/api/alunos/:email', (req, res) => {
//     let email = req.params.email;
//     if (!email) {
//         return res.status(404).send({ "status": "Parametros invalidos" });
//     }
//     let status = deleteByEmail(email);
//     if (!status) {
//         return res.status(404).send({ "status": "Nao foi possivel remover" });
//     }
//     res.send({ "status": "Removido com sucesso" });
// });

// app.patch('/api/alunos', (req, res) => {
//     if (!req.body.nome) return res.status(404).send();

//     let aluno = {
//         nome: req.body.nome,
//         email: req.body.email,
//         senha: req.body.senha,
//         telefone: req.body.telefone,
//         endereco: req.body.endereco
//     }

//     let novoAluno = updateAluno(aluno);
//     if (!novoAluno) return res.status(400).send();

//     res.send(novoAluno);
// })

// /**
//  * Autenticando com usuario Mockado
//  * Cria um token que expira a cada 30s
//  */
// app.post('/api/login', (req, res) => {
//     //Mock
//     let usuarioMock = {
//         nome: "donald",
//         senha: "1234"
//     }
//     let usuario = req.body;

//     if(!usuario) res.status(404).send();
//     if((usuario.nome === usuarioMock.nome) && (usuario.senha === usuarioMock.senha)) {
//         jwt.sign(
//             {
//                 usuario
//             }, secretKey, 
//             {
//                 expiresIn: '60s'
//             }, (err,token) => {
//                 res.json({token});
//         });
//     } else {
//         res.status(400).json({msg: 'Acesso Negado'});
//     }
// });

// function verifyToken(req, res, next){
//     //Pegando o header
//     let bearerHeader = req.headers['authorization'];
//     //verificando se o bearer eh undefined
//     if(typeof bearerHeader !== 'undefined'){
//         let bearer = bearerHeader.split(' ');
//         let bearerToken = bearer[1];

//         req.token = bearerToken;
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// }

app.listen(8000, () => {
    console.log('Servidor ouvindo na porta 80000');
});