
// console.log('Linha 1');

// setTimeout(function(){
//     console.log('Linha 2');
// }, 1000);

// setTimeout(function(){
//     console.log('Linha 3');
// }, 0);

// console.log('Linha 4');



//PRA FICAR MAIS CLARO

let soma = (a, b, patoDonald) => {
    patoDonald(a + b);
}

let subtrai = (a, b, callback) => {
    callback(a - b);
}

let multiplica = (a, b, callback) => {
    callback(a * b);
}

let dividi = (a, b, callback) => {
    callback(a / b);
}

soma(3, 7, (resultado) => {
    console.log(resultado)
});

subtrai(3, 7, (resultado) => {
    console.log(resultado)
});

multiplica(3, 7, (resultado) => {
    console.log(resultado)
});

dividi(3, 7, (resultado) => {
    console.log(resultado)
});


console.log('subtraindo de 15 a soma de 10 com 20');
soma(10, 20, (resultadoSoma) => {
    subtrai(15, resultadoSoma, (resultadoSubtrai) =>{
        console.log(resultadoSubtrai);
    });
});