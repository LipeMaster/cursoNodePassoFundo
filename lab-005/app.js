console.log("Inicializando app.js");

const http = require('http');

//criando um servidor
http.createServer( ( req, res ) => {
    res.write('Buenas, tche!!');
    res.end();
}).listen(8000);