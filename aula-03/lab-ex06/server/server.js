//Exemplo de JSON Web Token
const express = require('express');

const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');

const app = express();

const secretKey = 'S3crEtk4Y';

app.use(bodyParser.json());

app.get('/api', (req, res) => {
    res.json({msg: 'Seja bem vindo a API'});
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if(err){
            res.sendStatus(403);
        } else {
            res.json({
                msg: 'Post Criado',
                authData
            });
        }
    });
});

/**
 * Autenticando com usuario Mockado
 * Cria um token que expira a cada 30s
 */
app.post('/api/login', (req, res) => {
    //Mock
    let usuarioMock = {
        nome: "donald",
        senha: "bla123"
    }
    let usuario = req.body;

    if(!usuario) res.status(404).send();
    if((usuario.nome === usuarioMock.nome) && (usuario.senha === usuarioMock.senha)) {
        jwt.sign(
            {
                usuario
            }, secretKey, 
            {
                expiresIn: '60s'
            }, (err,token) => {
                res.json({token});
        });
    } else {
        res.status(400).json({msg: 'Acesso Negado'});
    }
});

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function verifyToken(req, res, next){
    //Pegando o header
    let bearerHeader = req.headers['authorization'];
    //verificando se o bearer eh undefined
    if(typeof bearerHeader !== 'undefined'){
        let bearer = bearerHeader.split(' ');
        let bearerToken = bearer[1];

        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(3000, () => {
    console.log('Servidor ouvindo na porta 30000');
});