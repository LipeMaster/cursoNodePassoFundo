//Servidor HTTP simples

const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

//Adicionando o primeiro contexto
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, (req, res) => {
    console.log('Ouvindo na porta', port);
});