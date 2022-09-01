import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import OrderBusiness from '../src/business/orderBusiness.js'
import Order from '../src/entities/order.js'

describe('Test suite for Template Method design pattern', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
    })
    describe('#OrderBusiness', () => {
        test('execution Order Business without Template Method', () => {
            const orderBusiness = new OrderBusiness()
            const order = new Order({
                customerId: 1,
                amount: 100,
                products: [{
                    id: 1,
                    name: 'Product 1',
                    price: 10
                }]
            })

            // todos devs devem obrigatoriamente lembrar de seguir a risca esse fluxo de execucao
            // se algum esquecer de chamar a função de validação, pode quebrar todo o sistema
            const isValid = orderBusiness._validateRequiredFields(order)
            const result = orderBusiness._create(order)

            expect(isValid).toBe(true);
            expect(result).toBe(true);

        });

        test('execution Order Business with Template Method', () => {
            const orderBusiness = new OrderBusiness();
            const calledValidationFn = jest.spyOn(
                orderBusiness,
                orderBusiness._validateRequiredFields.name
            );
            const calledCreateFn = jest.spyOn(
                orderBusiness,
                orderBusiness._create.name
            );

            const order = new Order({
                customerId: 1,
                amount: 100,
                products: [{
                    id: 1,
                    name: 'Product 1',
                    price: 10
                }]
            })

            // com template method, a sequência de passos é sempre executada
            // evita a replicacao de lógica
            const result = orderBusiness.create(order)


            expect(result).toBe(true);
            expect(calledValidationFn).toHaveBeenCalledTimes(1);
            expect(calledCreateFn).toHaveBeenCalledTimes(1);
        });
    })
})