//Server conteudo dinamico
const express = require('express');

const hbs = require('hbs');

const app = express();

const port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/../public'));

//setando o diretorio dos partials
hbs.registerPartials(__dirname + './views/partials');

//registrando o hbs
app.set('view engine', 'hbs');

//respondendo ao conteudo dinamico
//passando parametros
app.get('/welcome', (req, res) => {
    res.render('welcome.hbs', {
        welcome: 'Pagina de buenas',
        message: 'Buenas !!!'
    });
});

//pegando a msg passada por parametro
app.get('/mensagem', ( req, res ) => {
    let nome = req.query.nome || 'Juvenal';
    let idade = req.query.idade || '72';
    res.render('mensagem.hbs',  {
        nome,
        idade
    });
});

app.listen(port, () => {
    console.log('Ouvindo na porta:', port);
});