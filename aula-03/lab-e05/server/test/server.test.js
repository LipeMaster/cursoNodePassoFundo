const expect = require('expect');
const request = require('supertest');
const { app } = require('../server.js');

const {
    populaContatos,
    listaDeContatos,
    removeTodosContatos
} = require('./seeds/seeds.js');

beforeEach(populaContatos);

describe('GET /contatos', () => {
    it('deve retornar TODOS contatos', (done) => {
        request(app)
            .get('/contatos')
            .expect(200)
            .expect((res) => {
                expect(res.body.contatos).toBeTruthy();
                expect(res.body.contatos.length).toBe(2);
                expect(res.body.contatos[0].nome).toBe(listaDeContatos[0].nome);
                expect(res.body.contatos[0].email).toBe(listaDeContatos[0].email);
                expect(res.body.contatos[0].dataInclusao).toBe(listaDeContatos[0].dataInclusao);
            })
            .end(done);
    });
    it('nao retornara contatos pois a lista esta VAZIA', (done) => {
        removeTodosContatos();
        request(app)
            .get('/contatos')
            .expect(200)
            .expect((res) => {
                expect(res.body.contatos).toBeTruthy();
                expect(res.body.contatos.length).toBe(0);
            })
            .end(done);
    });
});

describe('GET /contatos/:email', () => {
    it('deve retornar um contato a partir do seu email', (done) => {
        request(app)
            .get('/contatos/' + listaDeContatos[1].email)
            .expect(200)
            .expect((res) => {
                expect(res.body).toBeTruthy();
                expect(res.body.nome).toBe('Donald');
                expect(res.body.email).toBe('donald@bla.com');
                expect(res.body.telefone).toBe('+5551999999999');
                expect(res.body.dataInclusao).toBe(listaDeContatos[1].dataInclusao);
            })
            .end(done);
    });

    it('retornara 404 pois o email nao foi encontrado', (done) => {
        request(app)
            .get('/contatos/naoexiste@nenhumlugar.com')
            .expect(404)
            .end(done);
    });
});

describe('POST /contatos', () => {
    it('deve adicionar um contato', (done) => {
        let contato = {
            nome: 'John Rambo',
            email: 'rambo@bla.com',
            telefone: '+333333333333'
        };

        let agora = new Date().toISOString().substr(0, 16);

        request(app)
            .post('/contatos')
            .send(contato)
            .expect(200)
            .expect((res) => {
                expect(res.body).toBeTruthy();
                expect(res.body.nome).toBe('John Rambo');
                expect(res.body.email).toBe('rambo@bla.com');
                expect(res.body.telefone).toBe('+333333333333');
                expect(res.body.dataInclusao).toBeTruthy();
                expect(res.body.dataInclusao).toContain(agora);
            })
            .end(done);
    });

    it('retornara 404, pois nao foi passado o usuario', (done) => {
        request(app)
            .post('/contatos')
            .send()
            .expect(404)
            .end(done);
    });

    it('retornara 400, pois eh um contato ja existente', (done) => {
        let contato = listaDeContatos[0];
        request(app)
            .post('/contatos')
            .send(contato)
            .expect(400)
            .end(done);
    });
});

describe('PATCH /contatos', () => {
    it('deve alterar um contato', (done) => {
        let contato = {
            nome: 'John Rambo',
            email: 'donald@bla.com',
            telefone: '+333333333333'
        };
        let agora = new Date().toISOString().substr(0, 16);

        request(app)
            .patch('/contatos')
            .send(contato)
            .expect((res) => {
                expect(res.body).toBeTruthy();
                expect(res.body.nome).toBe('John Rambo');
                expect(res.body.email).toBe('donald@bla.com');
                expect(res.body.telefone).toBe('+333333333333');
                expect(res.body.dataInclusao).toBeTruthy();
                expect(res.body.dataInclusao).toContain(agora);
            })
            .end(done);
    });

    it('retornara 404, pois nao foi passado o usuario', (done) => {
        request(app)
            .patch('/contatos')
            .send()
            .expect(404)
            .end(done);
    });

    it('retornara 400, pois o contato NAO existe', (done) => {
        let contato = {
            nome: 'John Rambo',
            email: 'rambo@bla.com',
            telefone: '+333333333333'
        };
        request(app)
            .patch('/contatos')
            .send(contato)
            .expect(400)
            .end(done);
    });
});

describe('DELETE /contatos/:email', () => {
    it('deve excluir um contato', (done) => {
        request(app)
            .delete('/contatos/donald@bla.com')
            .expect(200)
            .expect((res) => {
                expect(res.body).toBeTruthy();
                expect(res.body.status).toBe("removido com sucesso");
            })
            .end(done);
    });

    it('retornara 404, pois nao foi passado o usuario', (done) => {
        request(app)
            .delete('/contatos')
            .expect(404)
            .expect((res) => {
                expect(res.body).toBeTruthy();
            })
            .end(done);
    });

    it('retornara 404 pois o contato NAO existente', (done) => {
        request(app)
            .delete('/contatos/seumadruga@bla.com')
            .expect(404)
            .expect((res) => {
                expect(res.body).toBeTruthy();
                expect(res.body.status).toBe('nao foi possivel excluir, email nao encontrado');
            })
            .end(done);
    });
});