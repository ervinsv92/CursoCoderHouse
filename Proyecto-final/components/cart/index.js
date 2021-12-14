let Router = require("express");
const router = new Router();

const cartRouter = app =>{
    app.use("/api/cart", router);
    router.get("/", (req, res, next)=>{
        console.log(req.body);
        res.send("todo ok carrito");
    })
}

module.exports = cartRouter;