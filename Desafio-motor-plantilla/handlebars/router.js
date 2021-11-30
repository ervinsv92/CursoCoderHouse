const express = require("express");
const {Router} = express;
let router = new Router();
const Data = require('./data');
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

module.exports = router;