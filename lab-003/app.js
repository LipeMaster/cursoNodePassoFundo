console.log('Inicializando app.js');

const fs = require('fs');

const logger = fs.createWriteStream('teste.log', 'utf-8');

for (x = 0; x < 100; x++){
    logger.write(`Linha ${x}\n`, 'utf-8', (err) => {
        if (err){
            console.error('Errrrrrroooooouuuuu');
            throw err;
        }
    })
}
console.log("Arquivo criado com sucesso");