const productRouter = require("../components/product");
const cartRouter = require("../components/cart");

const serverRouter = app =>{
    productRouter(app);
    cartRouter(app);

    app.get("/", (req, res, next)=>{
        res.send("todo ok raiz")
    });
}

module.exports = serverRouter;