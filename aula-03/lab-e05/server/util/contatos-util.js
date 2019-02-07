const _ = require('lodash');

/**
 * Utilitário para os contatos
 */
var contatos = [];

//Adiciona um Array de contatos
const addAll = ( novosContatos ) =>  {
    contatos = [...novosContatos];
};

//Adiciona um contato
const addContato = ( contato ) => {
    let cont = findByEmail( contato.email );
    if ( !cont ) {
        let contatoNovo = {
            nome:     contato.nome,
            email:    contato.email,
            telefone: contato.telefone,
            dataInclusao: new Date()
        };
        contatos.push(contatoNovo);
        return contatoNovo;
    } else {
        return null;
    }
};

//Atualiza um contato
const updateContato = ( novoContato ) => {
    let cont = _.pick(novoContato, [ 'nome', 'email', 'telefone' ]);
    let contato = findByEmail( cont.email );
    if ( !contato ) {
        return null;
    } else {
        contato.nome = cont.nome;
        contato.telefone = cont.telefone;
        return contato;
    }

};

//Retorna TODOS contatos
const getAll = () => {
    return contatos;
};

//Retorna o contato a partir do email 
const findByEmail = ( email ) => {
    let contato = null
    getAll().forEach( ( cont ) => {
        if ( cont.email === email ) {
            contato = cont;
            return contato;
        }
    });
    return contato;
};

//Remove contatod a partir do email
const deleteByEmail = ( email ) => {
    let contato = findByEmail( email );
    if ( !contato ) return false;

    _.pull(getAll(), contato);
    
    return true;
};

const deleteAll = () => {
    contatos = [];
};

module.exports = {
    addAll,
    addContato,
    getAll,
    deleteByEmail,
    deleteAll,
    findByEmail,
    updateContato
}