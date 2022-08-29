const { describe, it } = require('mocha');
const { expect } = require('chai');
const { evaluateRegex, InvalidRegexError } = require('../src/util');

describe('Util', () => {
    it('#evaluateRegex should an error using an unsafe regex', () => {
        const expressionRegex = /^([a-z|A-Z|0-9]+\s?)+$/;
        /*
        // fica rodando em loop e quebra tudo!
        catastrophic backtracking!
        time \
        node --eval "/^([a-z|A-Z|0-9]+\s?)+$/.test('eaaae man como vai voce e como vai voce e como vai voce?') && console.log('legalzin')"
        */
        const result = () => evaluateRegex(expressionRegex);
        expect(result).to.throw(InvalidRegexError);
    });

    it('#evaluateRegex should not an error using a safe regex', () => {
        const expressionRegex = /^[a-z|A-Z|0-9]+$/;
        const result = () => evaluateRegex(expressionRegex);
        expect(result).to.not.throw(InvalidRegexError);
        expect(result).to.be.ok;
    });
});