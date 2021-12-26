let {Server: SocketIO} = require('socket.io');
const Contenedor = require('../../Contenedor');
let Data = require('../../data');
let path = require('path');
const ContenedorKnex = require('../../ContenedorKnex');
const RUTA_ARCHIVO = path.join(__dirname, '../../mensajes.txt');
let contenedor = new Contenedor(RUTA_ARCHIVO);

let configSqlite3 = require('knex')({
    client:'sqlite3',
    connection:{filename:'../../db/ecomerce.sqlite'}
});

const cnnSqlite3 = new ContenedorKnex(configSqlite3, 'messages');

let configMariaDB = require('knex')({
        client:'mysql',
        connection:{
            host:'127.0.0.1',
            user:'root',
            password:'1234',
            database:'knex'
        }
});

const cnnMariaDB = new ContenedorKnex(configMariaDB, 'products');

class Socket{
    static instancia;
    constructor(http){
        if(Socket.instancia){
            return Socket.instancia;
        }

        Socket.instancia = this;
        this.io = new SocketIO(http);
        this.data = new Data();
    }

    async init(){
        try {
            await cnnSqlite3.init();
            await cnnMariaDB.init();
            this.io.on("connection", async (socket) =>{
                //Archivos
                // socket.emit("escuchar_productos", this.data.obtenerProductos());
                // socket.emit("escuchar_mensajes", await contenedor.getAll());

                //Base datos
                socket.emit("escuchar_productos", await cnnMariaDB.getAll());
                socket.emit("escuchar_mensajes", await cnnSqlite3.getAll());

                socket.on("mensaje", async (data) =>{
                    //Archivos
                    //await contenedor.save(data);
                    //this.io.emit('escuchar_mensajes',await contenedor.getAll());         
                    
                    //Base datos
                    await cnnSqlite3.save(data);
                    this.io.emit('escuchar_mensajes',await cnnSqlite3.getAll());
                });

                socket.on("producto", data =>{
                    //Archivos
                    //this.data.guardarProducto(data)
                    //this.io.emit('escuchar_productos', this.data.obtenerProductos());

                    //Base datos
                    this.cnnMariaDB.save(data);
                    this.io.emit('escuchar_productos', this.cnnMariaDB.getAll());
                });
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Socket;