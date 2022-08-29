import mocha from 'mocha';
import chai from 'chai';
import Person from "../src/person.js";

const { describe, it } = mocha;
const { expect } = chai;

describe('Person', () => {
    it('should create a new instance of Person', () => {
        const person = Person.generateInstanceFromString('1 Avião,Navio,Bicicleta 20000000 2013-04-26 2016-06-23');
        const expected = {
            id: '1',
            vehicles: ['Avião', 'Navio', 'Bicicleta'],
            kmTraveled: '20000000',
            from: '2013-04-26',
            to: '2016-06-23'
        };
        expect(person).to.deep.equal(expected);
    });

    it('should format values', () => {
        const person = new Person({
            id: '1',
            vehicles: ['Avião', 'Navio', 'Bicicleta'],
            kmTraveled: '20000000',
            from: '2013-04-26',
            to: '2016-06-23'
        })

        const result = person.formatted('pt-BR');
        const expected = {
            id: 1,
            vehicles: 'Avião, Navio e Bicicleta',
            kmTraveled: '20.000.000 km',
            from: '26 de abril de 2013',
            to: '23 de junho de 2016'
        }
        expect(result).to.be.deep.equal(expected);
    });
});