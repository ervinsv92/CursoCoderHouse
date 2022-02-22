const express = require("express");
const {fork} = require("child_process");
const {Router} = express;
let router = new Router();
let routerApi = new Router();
const Data = require('./data');
const ProductFaker = require('./test/utils/dataFaker');
let data = new Data();
const numCpus = require('os').cpus().length;
//const passport = require('passport');

const serverRouter = (app, passport, arguments)=>{

    let isNoAuth =(req, res, next)=>{
        //console.log(req)
        if(req.isAuthenticated()){
            next();
        }else{
            res.redirect("/signin")
        }
    }

    app.use('/', router)
    app.use('/api/', routerApi)
    router.get("/", isNoAuth, (req, res) => {
        console.log("inicio de todo: ", req.user)
        //console.log("está autenticado: ", req.isAuthenticated())
        //if(req.session.nombre){
            //res.render("index", {nombre:req.session.nombre || 'soy el pato'});
        //}else{
           res.render("index", {username:req.user.username});
        //}
    });
    
    router.get("/signin", (req, res) => {
        console.log("inicio de todo: ", req.session)
        
        //if(req.session.nombre){
            //res.render("index", {nombre:req.session.nombre || 'soy el pato'});
        //}else{
           res.render("partials/login");
        //}
    });

    router.post("/productos", (req, res) => {
        data.guardarProducto(req.body);
        res.redirect("/productos");
    });
    
    router.get("/logout", (req, res) => {
        let username = req.user.username;
        req.logout();
        res.render("partials/logout", {username});
    });
    
    // router.get("/signout", (req, res) => {
    //     req.logout()
    //     res.render
    //     // req.session.destroy(err=>{
    //     //     if(!err) res.redirect("/");
    //     //     else res.send("Error de logout")
    //     // })
    // });
    
    router.post("/signin", passport.authenticate('login', {failureRedirect:'/faillogin', successRedirect: '/',}), (req, res) => {
        const {nombre} = req.body;
        req.session.nombre = nombre;
        res.redirect("/");
    });
    
    //router.post("/signup", (req, res) => {
    router.post("/signup", passport.authenticate('register', {failureRedirect:'/failsignup'}), (req, res) => {
        console.log("registro prueba", req.session.Usuario)
        //const {nombre} = req.body;
        //req.session.nombre = nombre;
        //const {username} = req.body
        
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
    
    router.get("/info", (req, res) => {

        let info = {
            arguments:JSON.stringify(arguments),
            so:process.platform,
            version:process.version,
            memory:process.memoryUsage.rss(),
            path:process.execPath,
            pid:process.pid,
            folder:process.cwd(),
            numCpus
        }

        res.render("partials/process", info);
    });

    routerApi.get('/random', (req, res)=>{
        const cantParam = parseInt(req.query.cant) || 100000000;
        //console.log("cant: ", cantParam)

        //return res.send('10')

        const forked = fork('./child-process/child.js')
        //console.log("fork")
        forked.on('message', cant=>{
            //console.log("on cant: ",cant)
            res.send(JSON.stringify(cant))
        })
        forked.send({'message':cantParam})
        //console.log("fork fin")
    })
}

module.exports = serverRouter;