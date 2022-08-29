const sinon = require('sinon');
const { deepStrictEqual } = require('assert');
const Service = require('./service');

const BASE_URL_1 = 'https://swapi.dev/api/planets/1/';
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/';

const mocks = {
    tatooine: require('../mocks/tatooine.json'),
    alderaan: require('../mocks/Alderaan.json'),
};

;(async () => {
    // node src/service.test.js > mocks/Alderaan.json => cria um json com o resultado da requisição
    /*{
        const service = new Service();
        const withOutStub = await service.makeRequest(BASE_URL_2);
        console.log(JSON.stringify(withOutStub, null, 2));
    }*/

    const service = new Service();
    const withStub = sinon.stub(service, service.makeRequest.name);
    withStub.withArgs(BASE_URL_1).resolves(mocks.tatooine);
    withStub.withArgs(BASE_URL_2).resolves(mocks.alderaan);

    {
        const expected = {
            name: 'Tatooine',
            surfaceWater: '1',
            appearedIn: 5,
        }

        const actual = await service.getPlanet(BASE_URL_1);
        deepStrictEqual(actual, expected);
    }

    {
        const expected = {
            name: 'Alderaan',
            surfaceWater: '40',
            appearedIn: 2,
        }

        const actual = await service.getPlanet(BASE_URL_2);
        deepStrictEqual(actual, expected);
    }
})()