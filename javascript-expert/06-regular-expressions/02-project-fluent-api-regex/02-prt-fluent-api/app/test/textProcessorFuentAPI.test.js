const { describe, it } = require('mocha');
const { expect } = require('chai');
const TextProcessorFuentAPI = require('../src/textProcessorFluentApi');
const mock = require('./mock/valid');

describe('TextProcessorFuentAPI', () => {
    it('#build', () => {
        const textProcessor = new TextProcessorFuentAPI(mock);
        const result = textProcessor.build();
        expect(result).to.equal(mock);
    });

    it('#extractPeopleData', () => {
        const textProcessor = new TextProcessorFuentAPI(mock);
        const result = textProcessor
            .extractPeopleData()
            .build();

        const expected = [
            [
                'Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e',
                'domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo.'
            ].join('\n'),
            [
                'Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e',
                'domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo.'
            ].join('\n'),
        ];

        expect(result).to.be.deep.equal(expected);
    });

    it('#divideTextInColumns', () => {
        const content = [
            [
                'Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e',
                'domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo.'
            ].join('\n')
        ];

        const result = new TextProcessorFuentAPI(content)
            .divideTextInColumns()
            .build();

        const expected = [
            [
                'Xuxa da Silva',
                ' brasileira',
                ' casada',
                ' CPF 235.743.420-12',
                ' residente e\ndomiciliada a Av. dos Estados',
                ' 99',
                ' bairro Jardins',
                ' São Paulo.'
            ]
        ];

        expect(result).to.be.deep.equal(expected);
    });

    it('removeEmptyCharacters', () => {
        const content = [
            [
                'Xuxa da Silva',
                ' brasileira',
                ' casada',
                ' CPF 235.743.420-12',
                ' residente e \ndomiciliada a Av. dos Estados',
                ' 99',
                ' bairro Jardins',
                ' São Paulo.'
            ]
        ];

        const result  = new TextProcessorFuentAPI(content)
            .removeEmptyCharacters()
            .build();


        const expected = [
            [
                'Xuxa da Silva',
                'brasileira',
                'casada',
                'CPF 235.743.420-12',
                'residente e domiciliada a Av. dos Estados',
                '99',
                'bairro Jardins',
                'São Paulo.'
            ]
        ];

        expect(result).to.be.deep.equal(expected);
    });
});