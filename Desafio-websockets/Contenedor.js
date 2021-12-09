const fs = require('fs');

class Contenedor{
    constructor(path){
        this.path = path;
        this.init();
    }

    async init(){
        this.mensajes = []
        await this.getAll()
    }

    async save(mensaje){
        this.mensajes.push(mensaje);
        await this.saveFile();
    }

    async getAll(){
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            if(data){
                this.mensajes = JSON.parse(data)
            }else{
                this.mensajes = [];
            }
        } catch (error) {
            console.error("getAll:", error)
        }
        return this.mensajes;
    }

    async saveFile(){
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.mensajes));
        } catch (error) {
            console.error("saveFile: ", error)
        }
    }
}

module.exports = Contenedor;