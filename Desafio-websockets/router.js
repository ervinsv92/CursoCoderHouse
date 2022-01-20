const express = require("express");
const {Router} = express;
let router = new Router();
const Data = require('./data');
const ProductFaker = require('./test/utils/dataFaker');
let data = new Data();

router.get("/", (req, res) => {
    res.render("index");
});

router.post("/productos", (req, res) => {
    data.guardarProducto(req.body);
    res.redirect("/productos");
});

router.get("/productos", (req, res) => {
    res.render("partials/products", {productos:data.obtenerProductos()});
});

router.get("/productos-test", (req, res) => {
    res.render("partials/products", {productos:ProductFaker.obtenerProductos()});
});

module.exports = router;