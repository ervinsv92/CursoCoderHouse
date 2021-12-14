const {uuid} = require('uuidv4');
const config = require("../../../config");
const FileHelper = require("../../../utils/file/FileHelper");

class ProductService{

    constructor(){
        console.log("products", config.config.fileProducts)
        this.fileHelper = new FileHelper(config.config.fileProducts);
    }

    async save(product){
        const list = await this.fileHelper.getAll() || [];
        product.id = uuid();
        list.push(product)
        await this.fileHelper.saveFile(list);
        return product;
    }
}

module.exports = ProductService;