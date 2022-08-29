const { faker } = require('@faker-js/faker');
const { join } = require('path');
const { writeFile } = require('fs/promises');

const Car = require('../src/entities/car');
const CarCategory = require('../src/entities/carCartegory');
const Customer = require('../src/entities/customer');


const seederBaseFolder = join(__dirname, '../', 'database');
const ITEMS_AMOUNT = 2;

const carCategory = new CarCategory({
    id: faker.datatype.uuid(),
    name: faker.vehicle.type(),
    carIds: [],
    price: faker.finance.amount(20, 100),
});

const cars = [];
const customers = [];
for(let index = 0; index <= ITEMS_AMOUNT; index++) {
    const car = new Car({
        id: faker.datatype.uuid(),
        name: faker.vehicle.model(),
        available: true,
        gasAvailable: true,
        releaseYear: faker.date.past().getFullYear()
    });
    carCategory.carIds.push(car.id);
    cars.push(car);

    const customer = new Customer({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        age: faker.datatype.number({ min: 18, max: 60 })
    });
    customers.push(customer);
}

const write = (fileName, data) => writeFile(join(seederBaseFolder, fileName), JSON.stringify(data, null, 2));

;(async () => {
    await write('cars.json', cars);
    await write('customers.json', customers);
    await write('carCategories.json', [carCategory], );

    console.log('cars', cars);
    console.log('customers', customers);
    console.log('carCategory', carCategory);
})();