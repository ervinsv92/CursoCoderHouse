let {Server: SocketIO} = require('socket.io');
const Contenedor = require('../../Contenedor');
let Data = require('../../data');
let path = require('path');
const RUTA_ARCHIVO = path.join(__dirname, '../../mensajes.txt');
let contenedor = new Contenedor(RUTA_ARCHIVO);

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

    init(){
        try {
            this.io.on("connection", async (socket) =>{
                socket.emit("escuchar_productos", this.data.obtenerProductos());
                socket.emit("escuchar_mensajes", await contenedor.getAll());

                socket.on("mensaje", async (data) =>{
                    await contenedor.save(data);
                    this.io.emit('escuchar_mensajes',await contenedor.getAll());                    
                });

                socket.on("producto", data =>{
                    this.data.guardarProducto(data)
                    this.io.emit('escuchar_productos', this.data.obtenerProductos());
                });
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Socket;