const yargs = require('yargs');

const pkg = require('./package.json');

const argv = yargs
    .options({
        n: {
            demandOption: true, //quando true é obrigatorio
            alias: 'nome',
            describe: 'Nome a imprimir',
            string: true
        },
        i: {
            demandOption: true, //quando true é obrigatorio
            alias: 'idade',
            describe: 'Idade a imprimir',
            number: true
        },
        x: {
            demandOption: false, //quando false nao eh obrigatorio
            alias: 'xxx',
            describe: 'Imprime Bla',
            nargs: 0
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var nome = argv.nome;
var idade = argv.idade;

console.log('Nome: ', nome, 'idade: ', idade);

if (argv.x != null){
    console.log('Bla');
}