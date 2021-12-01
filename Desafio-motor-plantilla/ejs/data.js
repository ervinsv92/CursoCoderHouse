class Data{
    constructor(){
        this.productos = [];
        this.ultimoId = 0;
        //this.init();
    }

    //Solo sirve para agregar datos de prueba
    init(){
        this.productos.push(
            {id:1, title:"Olla", price:"6000", thumbnail:"https://picsum.photos/200/300"},
            {id:2, title:"Plancha", price:"20000", thumbnail:"https://picsum.photos/200/300"}
        );
        this.ultimoId = 2;
    }

    guardarProducto(producto){
        this.ultimoId = this.ultimoId + 1;
        producto.id = this.ultimoId;
        this.productos.push(producto)
        return producto;
    }

    actualizarProducto(producto){
        let idx = this.productos.findIndex(x=>x.id==producto.id);
        if(idx < 0){
            return null;
        }else{
            this.productos[idx] = producto;
            return producto;
        }
    }

    obtenerProducto(id){
        return this.productos.find(x=>x.id== id);
    }

    obtenerProductos(){
        return this.productos;
    }

    eliminarProducto(id){
        let producto = this.productos.find(x=>x.id == id);
        if(producto){
            this.productos = this.productos.filter(x=> x.id != id);
            return producto;
        }else{
            return null;
        }
    }
}

module.exports = Data;