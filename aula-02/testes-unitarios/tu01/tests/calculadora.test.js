const assert = require('assert');

const {somar, subtrair} = require('../calculadora');

describe('Testes de calculadora - somar', () => {
    it('Retorna soma com valores positivos', () => {
        assert.ok(somar(2, 5) === 7);
    });
    it('Retorna somo com valores negativos', () => {
        assert.ok(somar(-2, -15) === -17);
    });
    it('Retorna soma com um valor positivo e outro negativo', () => {
        assert.ok(somar(-2, 15) === 13);
    })
});

describe('Testes de calculadora - subtrair', () => {
    it('Retorna subtração com valor positivo', () => {
        assert.ok(subtrair(10, 5) === 5);
    });
    it('Retorna subtração com valor negativo', () => {
        assert.ok(subtrair(5, 10) === -5);
    });
    it('Retorna subtração com dois valores negativos', () => {
        assert.ok(subtrair(-5, -10) === -15);
    });
});