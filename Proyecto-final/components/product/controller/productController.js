//se impota el servicio de productos
const ProductService = require("../services/productService");
const productService = new ProductService();

class ProductController{
    async get(req, res, next){
        //aqui dentro de llama los servicios, y se responde al cliente
        try {
            const {id} = req.params;

            if(id){
                let product = await productService.getById(id);
                res.json(product)
            }else{
                let products = await productService.getAll();
                res.json(products)
            }
        } catch (error) {
            res.status(400).json(error)
        }
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