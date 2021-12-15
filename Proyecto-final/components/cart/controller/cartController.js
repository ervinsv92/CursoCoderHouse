//se impota el servicio de productos
const CartService = require("../services/cartService");
const cartService = new CartService();

class CartController{
    async getProductsCartById(req, res, next){
        try {
            const {id} = req.params;
            let products = await cartService.getProductsCartById(id);
            res.json(products)
        } catch (error) {
            res.status(404).json({error:-3, description:error.message});
        }
    }

    async createCart(req, res, next){
        try {
            let idCart = await cartService.createCart();    
            res.json(idCart)
        } catch (error) {
            console.error(error)   
        }
    }

    async delete(req, res, next){
        try {
            const {id} = req.params;
            
            if(id == undefined || id == ''){
                return res.status(400).json({error:-4, description:'El payload id es requerido y no puede estar vacio.'});
            }

            let cart = await cartService.delete(id);    
            res.json(cart)
        } catch (error) {
            res.status(404).json({error:-3, description:error.message});
        }
    }

    async addProductToCart(req, res, next){
        try {
            const {id = ''} = req.params;
            const {idProduct = ''} = req.body;
            
            if(id == undefined || id == ''){
                return res.status(400).json({error:-4, description:'El payload id es requerido y no puede estar vacio.'});
            }else if(idProduct == undefined || idProduct == ''){
                return res.status(400).json({error:-4, description:'El payload idProduct es requerido y no puede estar vacio.'});
            }

            let cart = await cartService.addProductToCart(id, idProduct);    
            res.json(cart)
        } catch (error) {
            res.status(404).json({error:-3, description:error.message});
        }
    }

    async deleteProductFromCart(req, res, next){
        try {
            const {id, id_prod} = req.params;
            
            if(id == undefined || id == ''){
                return res.status(400).json({error:-4, description:'El payload id es requerido y no puede estar vacio.'});
            }else if(id_prod == undefined || id_prod == ''){
                return res.status(400).json({error:-4, description:'El payload id_prod es requerido y no puede estar vacio.'});
            }

            let productEliminated = await cartService.deleteProductFromCart(id, id_prod);    
            res.json(productEliminated)
        } catch (error) {
            res.status(404).json({error:-3, description:error.message});
        }
    }
}

module.exports = new CartController;