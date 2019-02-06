const express = require ('express');

const app = express();

const port = process.env.PORT || 8000;

app.get('/buenas', (req, res) => {
    res.send('Buenas, bem vindo !!!');
});

app.listen(port, (req, res) => {
    console.log('Ouvindo a porta: ', port);
});