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
        product.timestamp = Date.now();
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
        console.log("pro: ", product)
        if(product == null){
            throw new Error(`El producto con el id: ${id}, no se encuentra.`);
        }

        return product;
    }

    async update(product){
        const list = await this.fileHelper.getAll() || [];
        const idx = list.findIndex(x=>x.id == product.id);

        if(idx == -1){
            throw new Error(`El producto con el id: ${product.id} no se encuentra.`);
        }

        list[idx] = product;
        await this.fileHelper.saveFile(list);
        return product;
    }

    async delete(id){
        let list = await this.fileHelper.getAll() || [];
        const idx = list.findIndex(x=>x.id == id);

        if(idx == -1){
            throw new Error(`El producto con el id: ${id} no se encuentra.`);
        }

        const eliminate = list[idx];
        list = list.filter(x => x.id != id);
        await this.fileHelper.saveFile(list);
        return eliminate;
    }
}

module.exports = ProductService;