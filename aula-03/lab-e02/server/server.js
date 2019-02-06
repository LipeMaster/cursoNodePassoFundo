//Server com conteúdo estático

const express = require('express');

const app = express();

const port = process.env.PORT || 8000;

//diretório de conteúdo estático
app.use(express.static(__dirname + '/../public'));

//mapeamento virtual para o mesmo conteúdo estático
//usando, se necessitar de outros diretórios

app.use('/exercicio/felipe.html', express.static(__dirname + '/../public'));

app.listen(port, () => {
    console.log('Listen on port', port);
});
