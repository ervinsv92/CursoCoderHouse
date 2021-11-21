const { response } = require("express");
const express = require("express");
const {Router} = express;
let router = new Router();
const Data = require('./data');
let data = new Data();

router.get("/", (req, res)=>{
    res.json(data.obtenerProductos());
});

router.get("/:id", (req, res)=>{
    const {id} = req.params;
    const producto = data.obtenerProducto(id);
    if(producto){
        res.json(producto);
    }else{
        res.json({error:`El producto con el id: ${id} no fue encontrado`});
    }
});

router.post("/", (req, res)=>{
    let producto = req.body;
    res.json(data.guardarProducto(producto));
});

router.put("/:id", (req, res)=>{
    let producto = req.body;
    producto.id = req.params.id;
    const productoActualizado = data.actualizarProducto(producto);
    if(productoActualizado){
        res.json(productoActualizado);
    }else{
        res.json({error:`El producto con el id: ${producto.id} no fue encontrado`});
    }
});

router.delete("/:id", (req, res)=>{
    let {id} = req.params;
    const productoEliminado = data.eliminarProducto(id);
    if(productoEliminado){
        res.json(productoEliminado);
    }else{
        res.json({error:`El producto con el id: ${id} no fue encontrado`});
    }
});

module.exports = router;