const {
    addAll,
    deleteAll
} = require('../../util/contatos-util');

//contatos usados para os testes de GET
const listaDeContatos = [
    {
        nome: 'Juvenal',
        email: 'juvenal@bla.com',
        telefone: '+5551888888888',
        dataInclusao: new Date().toISOString()
    },
    {
        nome: 'Donald',
        email: 'donald@bla.com',
        telefone: '+5551999999999',
        dataInclusao: new Date().toISOString()
    }
];

const populaContatos = (done) => {
    deleteAll();
    addAll(listaDeContatos);
    done();
};

const removeTodosContatos = () =>{
    deleteAll();
}

module.exports = {
    populaContatos,
    listaDeContatos,
    removeTodosContatos
};