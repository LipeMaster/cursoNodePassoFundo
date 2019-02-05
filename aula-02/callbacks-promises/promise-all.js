let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promise 1 resolvida');
    }, 2000)
});

let promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Promise 2 rejeitada');
    }, 1000)
});

Promise.all([promise1, promise2])
    .then((resultado) => {
        console.log(resultado);
    })
    .catch((error) => {
        console.error(error);
    }
);
