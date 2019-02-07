const express       = require('express');
const bodyParser    = require('body-parser');
const fs            = require('fs');

const port = process.env.PORT || 3000;

const app = express();

const {
    addContato,
    getAll,
    findByEmail,
    updateContato,
    deleteByEmail
} = require('./util/contatos-util.js');

//registrando um parser de JSON
app.use(bodyParser.json());

//Registrando um Middleware
//Next usando para chamadas assincronas,
//usado para avisar o express quando o processamento terminar
//a aplicacao somente ira continuar, quando a funcao
//next() for executada
app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;

    //criando um arquivo de log
    fs.appendFile(__dirname + '/logs/server.log', log + '\n', (err) => {
        if(err){
            console.error('Erro ao gravar log logs/server.log', err);
        }
    });
    next();
});

//lista todos os contatos cadastrados
app.get('/contatos', (req, res) => {
    let contatos = getAll();
    res.send({contatos});
});

//retorna um contato pelo email
app.get('/contatos/:email', (req, res) => {
    let email = req.params.email;
    if(!email){
        return res.status(404).send();
    }

    let contato = findByEmail(email);
    if(!contato){
        return res.status(404).send();
    }
    res.send(contato);
});

//adiciona um contato
app.post('/contatos', (req, res) => {
    if(!req.body.nome)
        return res.status(404).send();
    
    let contato = {
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone
    };

    let novoContato = addContato(contato);
    if(!novoContato){
        return res.status(400).send('Erro ao adicionar contato');
    }

    res.send(novoContato);
});

//Atualiza um contato
app.patch('/contatos', (req, res) => {
    if(!req.body.nome)
        return res.status(404).send();

    let contato = {
        nome:       req.body.nome,
        email:      req.body.email,
        telefone:   req.body.telefone
    };

    let novoContato = updateContato(contato);
    if(!novoContato){
        return res.status(400).send('Erro ao alterar contato');
    }

    res.send(novoContato);

});

//remove um contato
app.delete('/contatos/:email', (req, res) => {
    let email = req.params.email;
    if(!email){
        return res.status(400).send({"status": "Parametros invalidos"});
    }

    let status = deleteByEmail(email);
    if(!status){
        return res.status(404).send({"status":"nao foi possivel excluir, email nao encontrado"});
    }

    res.send({"status":"removido com sucesso"});
    
});

//para prevenir erros nos testes
if (!module.parent){
    app.listen(port, () => {
        console.log('Server inicializado na porta:', port);
    });
}

module.exports = {app};