import {
    expect,
    describe,
    test,
    jest,
    beforeEach,
} from '@jest/globals';
import Util from "./../../src/util.js";

describe('#Util - Strings', () => {

    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    test('#upperCaseFirstLetter should transform first letter to upper case', () => {
        const data = 'hello';
        const expected = 'Hello';
        const result = Util.upperCaseFirstLetter(data);

        expect(result).toStrictEqual(expected);
    });

    test('#lowerCaseFirstLetter should transform first letter to lower case', () => {
        const data = 'Hello';
        const expected = 'hello';
        const result = Util.lowerCaseFirstLetter(data);

        expect(result).toStrictEqual(expected);
    });

    test.todo('#upperCaseFirstLetter given an empty string it should return empty string');
    test.todo('#lowerCaseFirstLetter given an empty string it should return empty string');
});