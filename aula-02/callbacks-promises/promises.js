let valor = 127;

//Criando um promise

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if(valor >= 100){
            resolve(`Valor valido: ${valor}`);
        } else {
            reject(`Valor invalido: ${valor}`);
        }
    }, 3000)
});

//Executando o promise
promise.then((resultado) => {
    console.log(resultado);
}).catch((erro) => {
    console.error(erro);
});