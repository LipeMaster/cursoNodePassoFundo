//Servidor HTTP simples

const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, (req, res) => {
    console.log('Ouvindo na porta', port);
});