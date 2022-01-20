var faker = require('faker');

class ProductFaker{
    constructor(){}

    obtenerProductos(){
        let list = [];
        for (let index = 0; index < 5; index++) {
            list.push({
                title:faker.name.findName(),
                price:faker.finance.amount(),
                thumbnail: faker.image.imageUrl()
            });
            
        }

        return list;
    }
}

module.exports = new ProductFaker();