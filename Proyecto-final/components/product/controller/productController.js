//se impota el servicio de productos
const ProductService = require("../services/productService");
const productService = new ProductService();

class ProductController{
    get(req, res, next){
        //aqui dentro de llama los servicios, y se responde al cliente
    }

    async save(req, res, next){
        try {
            let product = await productService.save(req.body);    
            res.json(product)
        } catch (error) {
            console.error(error)   
        }
    }

    update(req, res, next){

    }

    delete(req, res, next){

    }
}

module.exports = new ProductController;