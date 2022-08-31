const Product = require('../../src/entities/product');

class ProductDataBuilder{
    constructor(){
        // default sao os dados corretos
        // o caso de sucesso
        this.product = {
            id: '000001',
            name: 'computer',
            price: 1000,
            category: 'electronic'
        }
    }

    static aProduct(){
        return new ProductDataBuilder();
    }

    withInvalidId(){
        this.product.id = '';
        return this;
    }

    withInvalidName(){
        this.product.name = 'abc123';
        return this;
    }

    withInvalidPrice(){
        this.product.price = 10000;
        return this;
    }

    withInvalidCategory(){
        this.product.category = 'construction';
        return this;
    }

    build(){
        const product = new Product(this.product);
        return product;
    }
}

module.exports = ProductDataBuilder;