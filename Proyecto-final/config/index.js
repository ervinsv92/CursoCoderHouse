require("dotenv").config();

const config = {
    port:process.env.PORT || 8080,
    fileProducts:process.env.FILE_PRODUCTS || 'products.txt',
    fileCart:process.env.FILE_CART || 'cart.txt',
}

module.exports = {config};