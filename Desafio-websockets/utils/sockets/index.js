let {Server: SocketIO} = require('socket.io');
const {normalize, schema}=require('normalizr');
const Contenedor = require('../../Contenedor');
let Data = require('../../data');
let path = require('path');
const ContenedorKnex = require('../../ContenedorKnex');
const RUTA_ARCHIVO = path.join(__dirname, '../../mensajes.txt');
let contenedor = new Contenedor(RUTA_ARCHIVO);

let configSqlite3 = require('knex')({
    client:'sqlite3',
    connection:{filename: path.resolve(__dirname,'../../db/ecomerce.sqlite')}
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

    normalizarMensajes(mensajes){
        const authorSchema = new schema.Entity('author',{}, {idAttribute:'correo'});
        const messageSchema = new schema.Entity('mensaje');

        const roomMessage = new schema.Entity('rooms',{
            author:authorSchema,
            mensaje:[messageSchema]
        });
        const arrayWithId = {id:'123', mensajes}
        const normalized = normalize(arrayWithId, roomMessage);
        return mensajes.length ==0?[]:normalized;
    }

    async init(){
        try {
            //await cnnSqlite3.init();
            //await cnnMariaDB.init();
            this.io.on("connection", async (socket) =>{
                //Archivos
                socket.emit("escuchar_productos", this.data.obtenerProductos());
                const normalized = this.normalizarMensajes(await contenedor.getAll())
                
                console.log('normalizado: ', normalized)
                socket.emit("escuchar_mensajes", normalized);

                //Base datos
                //socket.emit("escuchar_productos", await cnnMariaDB.getAll());
                //socket.emit("escuchar_mensajes", await cnnSqlite3.getAll());

                socket.on("mensaje", async (data) =>{

                    console.log('data: ', data)

                    //Archivos
                    await contenedor.save(data);
                    const normalized = this.normalizarMensajes(await contenedor.getAll())
                
                    console.log('normalizado: ', normalized)
                    socket.emit("escuchar_mensajes", normalized);
                    //this.io.emit('escuchar_mensajes',await contenedor.getAll());         
                    
                    //Base datos
                    //await cnnSqlite3.save(data);
                    //this.io.emit('escuchar_mensajes',await cnnSqlite3.getAll());
                });

                socket.on("producto", async (data) =>{
                    //Archivos
                    this.data.guardarProducto(data)
                    this.io.emit('escuchar_productos', this.data.obtenerProductos());

                    //Base datos
                    //await cnnMariaDB.save(data);
                    //this.io.emit('escuchar_productos', await cnnMariaDB.getAll());
                });
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Socket;