const express = require("express");
const {Router} = express;
let router = new Router();
const Data = require('./data');
const ProductFaker = require('./test/utils/dataFaker');
let data = new Data();
const passport = require('passport');

router.get("/", (req, res) => {

    if(req.session.nombre){
        res.render("index", {nombre:req.session.nombre || ''});
    }else{
        res.render("partials/login");
    }
});

router.post("/productos", (req, res) => {
    data.guardarProducto(req.body);
    res.redirect("/productos");
});

router.get("/logout", (req, res) => {
    res.render("partials/logout", {nombre:req.session.nombre});
});

router.get("/signout", (req, res) => {
    req.session.destroy(err=>{
        if(!err) res.redirect("/");
        else res.send("Error de logout")
    })
});

router.post("/sigin", passport.authenticate('login', {failureRedirect:'faillogin'}), (req, res) => {
    const {nombre} = req.body;
    req.session.nombre = nombre;
    res.redirect("/");
});

router.post("/signup", passport.authenticate('signup', {failureRedirect:'failsignup'}), (req, res) => {
    const {nombre} = req.body;
    req.session.nombre = nombre;
    res.redirect("/");
});

router.get("/signup", (req, res) => {
    res.render("partials/signup");
});

router.get("/productos", (req, res) => {
    res.render("partials/products", {productos:data.obtenerProductos()});
});

router.get("/productos-test", (req, res) => {
    res.render("partials/products", {productos:ProductFaker.obtenerProductos()});
});

router.get("/faillogin", (req, res) => {
    res.render("partials/faillogin");
});

router.get("/failsignup", (req, res) => {
    res.render("partials/failsignup");
});

module.exports = router;