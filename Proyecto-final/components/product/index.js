let Router = require("express");
const adminMiddleware = require("../../utils/middleware/auth/authMiddleware");
const router = new Router();
const productController = require("../product/controller/productController");

const productRouter = app =>{
    app.use("/api/products", router);
    router.get("/:id?", productController.get);
    router.post("/", adminMiddleware, productController.save);
    router.put("/:id", adminMiddleware, productController.update);
    router.delete("/:id", adminMiddleware, productController.delete);
}

module.exports = productRouter;