const {uuid} = require('uuidv4');
const config = require("../../../config");
const FileHelper = require("../../../utils/file/FileHelper");

class ProductService{
    constructor(){
        this.fileHelper = new FileHelper(config.config.fileProducts);
    }

    async save(product){
        const list = await this.fileHelper.getAll() || [];
        product.id = uuid();
        list.push(product)
        await this.fileHelper.saveFile(list);
        return product;
    }

    async getAll(){
        const list = await this.fileHelper.getAll() || [];
        return list;
    }

    async getById(id){
        const list = await this.fileHelper.getAll() || [];
        const product = list.find(x=>x.id == id) || null;

        if(!product){
            throw new Error(`El producto con el id: ${id}, no se encuentra.`);
        }

        return product;
    }

    async update(product){
        const list = await this.fileHelper.getAll() || [];
        const idx = list.findIndex(x=>x.id == product.id);
        list[idx] = product;
        await this.fileHelper.saveFile(list);
        return product;
    }

    async delete(id){
        let list = await this.fileHelper.getAll() || [];
        const idx = list.findIndex(x=>x.id == id);
        const eliminado = list[idx];
        list = list.filter(x => x.id != id);
        await this.fileHelper.saveFile(list);
        return eliminado;
    }
}

module.exports = ProductService;