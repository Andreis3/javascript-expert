import { expect, describe, test, jest, beforeAll } from '@jest/globals';

import PaymentSubject from "../src/subjects/paymentSubject.js";
import Payment from "../src/events/payment.js";
import Shipment from "../src/observers/shipment.js";
import Marketing from "../src/observers/marketing.js";

describe('Test Suite for Observer Pattern', () => {
    beforeAll(() => {
        jest.spyOn(console, console.log.name).mockImplementation(() => {});
    });
    test('#PaymantsSubject notify observers', () => {
        const paymentSubject = new PaymentSubject();
        const observer = {
            update: jest.fn()
        };

        const data = 'hello world';
        const expected = data;

        paymentSubject.subscribe(observer);
        paymentSubject.notify(data);
        expect(observer.update).toBeCalledWith(expected);
    });

    test('#PaymantsSubject should not notify unsubscribed observers', () => {
        const paymentSubject = new PaymentSubject();
        const observer = {
            update: jest.fn()
        };

        const data = 'hello world';
        const expected = data;

        paymentSubject.subscribe(observer);
        paymentSubject.unsubscribe(observer);
        paymentSubject.notify(data);
        expect(observer.update).not.toHaveBeenCalled();
    });
    test('#PaymantsSubject should notify subscribers after a credit card payment', () => {
        const paymentSubject = new PaymentSubject();
        const payment = new Payment(paymentSubject);

        const paymentSubjectNotifySpy = jest.spyOn(
            payment.paymentSubject,
            paymentSubject.notify.name
        )

        const data = { userName: 'John Doe', id: Date.now() };
        payment.creditCard(data);
        expect(paymentSubjectNotifySpy).toBeCalledWith(data);
    });
    test('#All should notify subscribers after a credit card payment', () => {
        const paymentSubject = new PaymentSubject();
        const shipment = new Shipment();
        const marketing = new Marketing();
        const payment = new Payment(paymentSubject);

        const shipmentSpy = jest.spyOn(shipment, shipment.update.name);
        const marketingSpy = jest.spyOn(marketing, marketing.update.name);

        paymentSubject.subscribe(shipment);
        paymentSubject.subscribe(marketing);

        const data = { userName: 'John Doe', id: Date.now() };
        payment.creditCard(data);

        expect(shipmentSpy).toBeCalledWith(data);
        expect(marketingSpy).toBeCalledWith(data);
    });
})