import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import BaseBusiness from '../src/business/base/baseBusiness.js'
import { NotImplementedException } from '../src/util/exceptions.js'

describe('#BaseBusiness', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    test('should throw an error when child class doesnt implement _validateRequiredFields function', () => {
        class ConcreteClass extends BaseBusiness {}
        const concreteClass = new ConcreteClass();
        const validationError = new NotImplementedException(concreteClass._validateRequiredFields.name);

        expect(() => concreteClass._validateRequiredFields({})).toThrow(validationError);
    });

    test('should throw an error when _validateRequiredFields returns false', () => {
        const VALIDATION_DOESNT_SUCCEED = false

        class ConcreteClass extends BaseBusiness {
            _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_DOESNT_SUCCEED)
        }
        const concreteClass = new ConcreteClass();
        const validationError = new Error('Invalid data');

        expect(() => concreteClass.create({})).toThrow(validationError);
    });

    test('should throw an error when child class doesnt implement _create function', () => {
        const VALIDATION_SUCCEED = true

        class ConcreteClass extends BaseBusiness {
            _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEED)
        }
        const concreteClass = new ConcreteClass();
        const validationError = new NotImplementedException(concreteClass._create.name);

        expect(() => concreteClass.create({})).toThrow(validationError);
    });

    test('should call _create and _validateRequiredFields on create', () => {
        const VALIDATION_SUCCEED = true;
        const CREATE_SUCCEED = true;

        class ConcreteClass extends BaseBusiness {
            _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEED)
            _create = jest.fn().mockReturnValue(CREATE_SUCCEED)
        };

        const concreteClass = new ConcreteClass();
        const baseClassSpy = jest.spyOn(
            BaseBusiness.prototype,
            BaseBusiness.prototype.create.name
        );

        const result = concreteClass.create({});

        expect(baseClassSpy).toHaveBeenCalledTimes(1);
        expect(concreteClass._validateRequiredFields).toHaveBeenCalledTimes(1);
        expect(concreteClass._create).toHaveBeenCalledTimes(1);
        expect(result).toBe(CREATE_SUCCEED);

    });
});