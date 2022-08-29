const { describe, it } = require('mocha');
const { expect } = require('chai');

const Person = require('../src/person');

describe('Person', () => {
    it('should generate a person instance from properties list', () => {
        const content = [
            'Xuxa da Silva',
            'brasileira',
            'casada',
            'CPF 235.743.420-12',
            'residente e domiciliada a Av. dos Estados',
            '99',
            'bairro Jardins',
            'São Paulo.'
        ];

        const result = new Person(content);
        const expected = {
            name: 'Xuxa da Silva',
            nacionalidade: 'Brasileira',
            estadoCivil: 'Casada',
            documento: '23574342012',
            rua: 'Av. dos Estados',
            numero: '99',
            bairro: 'Jardins',
            estado: 'São Paulo'
        };

        expect(result).to.be.deep.equal(expected);
    });
});