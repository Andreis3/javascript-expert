const Tax = require('../entities/tax');
const Transaction = require('../entities/transaction');
const BaseRepository = require('./../repository/base/baseRepository');

class CarService {
  constructor({ cars }){
    this.carRepository = new BaseRepository({ file: cars });
    this.taxesBaseOnAge = Tax.taxesBaseOnAge;
    this.currencyFormat = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  getRandomPositionPositionFromArray(list) {
    const listLength = list.length;
    return Math.floor(Math.random() * (listLength));
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionPositionFromArray(carCategory.carIds);
    const carId = carCategory.carIds[randomCarIndex];

    return carId;
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);
    const car = await this.carRepository.find(carId);
    return car;
  }

  calculateFinalPrice(customer, carCategory,numberOfDay) {
    const { age } = customer;
    const price = carCategory.price;
    const { then: tax } = this.taxesBaseOnAge.find(
      tax => age >= tax.from && age <= tax.to
    )

    const finalPrice = ((tax * price) * (numberOfDay));

    return this.currencyFormat.format(finalPrice);
  }

  async rent(customer, carCategory, numberOfDay) {
    const car  = await this.getAvailableCar(carCategory);
    const finalPrice = await this.calculateFinalPrice(customer, carCategory, numberOfDay);

    const today = new Date();
    today.setDate(today.getDate() + numberOfDay);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dueDate = today.toLocaleDateString('pt-br', options);

    const transaction = new Transaction({ customer, dueDate, car, amount: finalPrice });

    return transaction;
  }
}

module.exports = CarService;