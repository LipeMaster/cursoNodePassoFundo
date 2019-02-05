const request = require('request');

request('http://localhost:8000/', function( error, response, body ){
    if ( response.statusCode === 200 ) {
        let usuario = JSON.parse(body);  //transforma o JSON em um objeto
        console.log(usuario.nome);
        console.log(); 
    } else {
        console.log('Responde: ', response.statusCode);
    }
});