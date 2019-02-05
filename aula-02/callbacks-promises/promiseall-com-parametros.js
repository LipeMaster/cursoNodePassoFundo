let somar = (a, b) => {
    return new Promise((resolve, reject) => {
        let x = a + b;
        if (x >= 0) {
            resolve('somar: ' + x);
        } else {
            reject('somar: ' + x);
        }
    });
}

let subtrair = (a, b) => {
    return new Promise((resolve, reject) => {
        let x = a - b;
        if (x >= 0) {
            resolve(
                {
                    operacao: 'subtrair',
                    status: 'Ok',
                    resultado:  x
                }
            )
        } else {
            reject(
                {
                    operacao: 'subtrair',
                    status: 'Erro',
                    resultado:  x
                }
            )
        }
    });
}

Promise.all([
    somar(1, 3),
    subtrair(-10, 7)
]).then((retorno) => {
    console.log(retorno);
}).catch((erro) => {
    console.error(erro);
});