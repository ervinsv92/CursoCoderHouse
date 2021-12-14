//se impota el servicio de productos
const ProductService = require("../services/productService");
const productService = new ProductService();

class ProductController{
    async get(req, res, next){
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
            res.status(404).json({error:-3, description:error.message});
        }
    }

    async save(req, res, next){
        try {

            const {name, description, code, image, price, stock} = req.body;

            if(name == undefined || name == ''){
                return res.status(400).json({error:-4, description:'El payload name es requerido y no puede estar vacio.'});
            }else if(description == undefined || description == ''){
                return res.status(400).json({error:-4, description:'El payload description es requerido y no puede estar vacio.'});
            }else if(code == undefined || code == ''){
                return res.status(400).json({error:-4, description:'El payload code es requerido y no puede estar vacio.'});
            }else if(image == undefined || image == ''){
                return res.status(400).json({error:-4, description:'El payload image es requerido y no puede estar vacio.'});
            }else if(price == undefined || price == ''){
                return res.status(400).json({error:-4, description:'El payload price es requerido y no puede estar vacio.'});
            }else if(stock == undefined || stock == ''){
                return res.status(400).json({error:-4, description:'El payload stock es requerido y no puede estar vacio.'});
            }

            let product = await productService.save(req.body);    
            res.json(product)
        } catch (error) {
            console.error(error)   
        }
    }

    async update(req, res, next){
        try {
            const {id} = req.params;
            req.body.id = id;

            const {name, description, code, image, price, stock} = req.body;

            if(name == undefined || name == ''){
                return res.status(400).json({error:-4, description:'El payload name es requerido y no puede estar vacio.'});
            }else if(description == undefined || description == ''){
                return res.status(400).json({error:-4, description:'El payload description es requerido y no puede estar vacio.'});
            }else if(code == undefined || code == ''){
                return res.status(400).json({error:-4, description:'El payload code es requerido y no puede estar vacio.'});
            }else if(image == undefined || image == ''){
                return res.status(400).json({error:-4, description:'El payload image es requerido y no puede estar vacio.'});
            }else if(price == undefined || price == ''){
                return res.status(400).json({error:-4, description:'El payload price es requerido y no puede estar vacio.'});
            }else if(stock == undefined || stock == ''){
                return res.status(400).json({error:-4, description:'El payload stock es requerido y no puede estar vacio.'});
            }

            let product = await productService.update(req.body);    
            res.json(product)
        } catch (error) {
            res.status(404).json({error:-3, description:error.message});
        }
    }

    async delete(req, res, next){
        try {
            const {id} = req.params;
            
            if(id == undefined || id == ''){
                return res.status(400).json({error:-4, description:'El payload id es requerido y no puede estar vacio.'});
            }

            let product = await productService.delete(id);    
            res.json(product)
        } catch (error) {
            res.status(404).json({error:-3, description:error.message});
        }
    }
}

module.exports = new ProductController;