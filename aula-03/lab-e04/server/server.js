//server conteúdo dinamico
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const app = express();

//array para armazenar do dados das pessoas
const pessoas = [];

//criando um aplication/x-www-form-urlencoded parser
//isto é obrigatorio para buscar parametros POST
urlencodedParser = bodyParser.urlencoded({extended: false});

//usando o parser
app.use(urlencodedParser);

const port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/../public'));

//setando o diretorio dos partials
hbs.registerPartials(__dirname + '/../views/partials');

//registrando o hbs
app.set('view engine', 'hbs');

//registrando um helper para current year
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

//pegando a msg passada por parametro
app.post('/mensagem', (req, res) => {
    if (!req.body) return res.status(400).send();
    let nome = req.body.nome || 'Donald';
    let idade = req.body.idade || 84;
    pessoas.push({ nome, idade });
    res.render('mensagem.hbs', { nome, idade });
});

app.get('/lista', (req, res) => {
    res.render('lista.hbs', {
        pessoas
    });
});

// app.get('/', (req, res) => {
//     res.render('index.hbs', {
//         pessoas
//     });
// });
app.get('/', (req, res) => {
    res.render('index.hbs',{
        pessoas
    });
    //res.send("Teste");
});

app.listen(port, () => {
    console.log('Ouvindo na porta:', port);
});