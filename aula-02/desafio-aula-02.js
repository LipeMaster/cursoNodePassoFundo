const request = require('request');

let usrSrvc1 = new Promise((resolve, reject) => {
    let usuario = null;

    request('http://10.20.17.110:8000/', (err, res, body) => {
        if(body){
            //atencao este codigo de retorno esta errado(404) intencionalmente, normalmente 200
            if(res.statusCode === 404){
                usuario = JSON.parse(body);
                resolve(usuario.nome + ' - ' + usuario.email);
            } else {
                reject('Erro ao acessar servico1');
            }
        } else {
            reject('Retorno em branco servico1');
        }
    });
});

let usrSrvc2 = new Promise((resolve, reject) => {
    let usuario = null;

    request('http://10.20.17.110:8001/', (err, res, body) => {
        if(body){
            //atencao este codigo de retorno esta errado(405) intencionalmente, normalmente 200
            if(res.statusCode === 405){
                usuario = JSON.parse(body);
                resolve(usuario.nome + ' - ' + usuario.status + ' - ' + usuario.obs);
            } else {
                reject('Erro ao acessar servico2');
            }
        } else {
            reject('Retorno em branco servico2');
        }
    });
});

Promise.all([
    usrSrvc1, usrSrvc2
]).then((retorno) => {
    console.log(retorno);
}).catch((erro) => {
    console.log(erro);
});

// request('http://10.20.17.110:8001/', function( error, response, body ){
//     console.log(JSON.stringify)
//     let usuario = JSON.parse(body);  //transforma o JSON em um objeto
//     console.log(usuario.nome + ' ' + usuario.status + ' ' + usuario.obs);
// });