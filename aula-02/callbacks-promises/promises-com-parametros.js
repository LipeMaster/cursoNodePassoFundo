let soma = (a, b) => {
    let x = a + b;
    return new Promise((resolve, reject) => {
        if(x >= 0){
            resolve(`Valor positivo: ${x}`);
        } else {
            reject(`Valor negativo: ${x}`);
        }
    });
}

soma(-11, 7).then((resultado) => {
    console.log(resultado);
}).catch((erro) => {
    console.error(erro);
});