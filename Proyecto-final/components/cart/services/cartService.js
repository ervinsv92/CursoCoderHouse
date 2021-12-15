const {uuid} = require('uuidv4');
const config = require("../../../config");
const FileHelper = require("../../../utils/file/FileHelper");

class CartService{
    constructor(){
        this.fileHelper = new FileHelper(config.config.fileCart);
        this.fileHelperProducts = new FileHelper(config.config.fileProducts);
    }

    async createCart(){
        const list = await this.fileHelper.getAll() || [];
        let cart = {}
        cart.id = uuid();
        cart.timestamp = Date.now();
        cart.products = [];
        list.push(cart)
        await this.fileHelper.saveFile(list);
        return cart.id;
    }

    async getProductsCartById(id){
        const list = await this.fileHelper.getAll() || [];
        const cart = list.find(x=>x.id == id) || null;
        
        if(cart == null){
            throw new Error(`El cart con el id: ${id}, no se encuentra.`);
        }

        return cart.products;
    }

    async addProductToCart(idCart, idProduct){
        const list = await this.fileHelper.getAll() || [];
        const listProducts = await this.fileHelperProducts.getAll() || [];
        const idx = list.findIndex(x=>x.id == idCart);
        const idxProduct = listProducts.findIndex(x=>x.id == idProduct);
        
        if(idx == -1){
            throw new Error(`El cart con el id: ${cart.id} no se encuentra.`);
        }else if(idxProduct == -1){
            throw new Error(`El product con el id: ${idProduct} no se encuentra.`);
        }

        const product = listProducts[idxProduct];

        list[idx].products.push(product);
        await this.fileHelper.saveFile(list);
        return list[idx];
    }

    async delete(id){
        let list = await this.fileHelper.getAll() || [];
        const idx = list.findIndex(x=>x.id == id);

        if(idx == -1){
            throw new Error(`El cart con el id: ${id} no se encuentra.`);
        }

        const eliminate = list[idx];
        list = list.filter(x => x.id != id);
        await this.fileHelper.saveFile(list);
        return eliminate;
    }

    async deleteProductFromCart(idCart, idProduct){
        let list = await this.fileHelper.getAll() || [];
        const idx = list.findIndex(x=>x.id == idCart);

        if(idx == -1){
            throw new Error(`El cart con el id: ${id} no se encuentra.`);
        }

        let eliminate = list[idx].products.find(x=>x.id == idProduct);
        list[idx].products = list[idx].products.filter(x=>x.id != idProduct);
        
        await this.fileHelper.saveFile(list);
        return eliminate;
    }
}

module.exports = CartService;