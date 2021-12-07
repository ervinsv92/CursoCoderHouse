let {Server: SocketIO} = require('socket.io');
let Data = require('../../data');

class Socket{
    static instancia;
    constructor(http){
        if(Socket.instancia){
            return Socket.instancia;
        }

        Socket.instancia = this;
        this.io = new SocketIO(http);
        this.mensajes = [];
        this.data = new Data();
        this.data.init();
    }

    init(){
        try {
            this.io.on("connection", socket =>{
                console.log("Usuario conectado");
                socket.emit("init_productos", this.data.obtenerProductos());
                socket.emit("init_mensajes", this.mensajes);
                socket.on("mensaje", data =>{
                    this.mensajes.push(data);
                    this.io.emit('escuchar_mensajes', this.mensajes);
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