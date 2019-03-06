const _ = require('lodash');

/**
 * Utilitário para os alunos
 */
var alunos = [];

// //Adiciona um Array de alunos
// const addAll = ( novosalunos ) =>  {
//     alunos = [...novosalunos];
// };

//Adiciona um aluno
const addAluno = ( aluno ) => {
    let alun = findByEmail( aluno.email );
    if ( !alun ) {
        let alunoNovo = {
            nome:       aluno.nome,
            email:      aluno.email,
            senha:      aluno.senha,
            telefone:   aluno.telefone,
            endereco:   aluno.endereco,
            dataInclusao: new Date()
        };
        alunos.push(alunoNovo);
        return alunoNovo;
    } else {
        return null;
    }
};

//Atualiza um aluno
const updateAluno = ( novoAluno ) => {
    let alun = _.pick(novoAluno, [ 'nome', 'email', 'telefone', 'endereco' ]);
    let aluno = findByEmail( alun.email );
    if ( !aluno ) {
        return null;
    } else {
        aluno.nome = alun.nome;
        aluno.telefone = alun.telefone;
        aluno.endereco = alun.endereco
        return aluno;
    }

};

//Retorna TODOS alunos
const getAll = () => {
    return alunos;
};

//Retorna o aluno a partir do email 
const findByEmail = ( email ) => {
    let aluno = null
    getAll().forEach( ( alun ) => {
        if ( alun.email === email ) {
            aluno = alun;
            return aluno;
        }
    });
    return aluno;
};

//Remove aluno a partir do email
const deleteByEmail = ( email ) => {
    let aluno = findByEmail( email );
    if ( !aluno ) return false;

    _.pull(getAll(), aluno);
    
    return true;
};

const deleteAll = () => {
    alunos = [];
};

module.exports = {
    // addAll,
    addAluno,
    getAll,
    deleteByEmail,
    // deleteAll,
    findByEmail,
    updateAluno
}