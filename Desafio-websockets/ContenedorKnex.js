class ContenedorKnex{
    constructor(conexion, tabla){
        this.conexion = conexion;
        this.tabla = tabla;
    }

    async init(){
        try {
            if(this.tabla == 'products'){
                await this.conexion.schema.createTable(this.tabla, (table)=>{
                    table.increments('id')
                    table.string('title')
                    table.integer('price')
                    table.string('thumbnail')
                });
            }else if (this.tabla == 'messages'){
                await this.conexion.schema.createTable(this.tabla, (table)=>{
                    table.increments('id');
                    table.string('correo');
                    table.string('fecha');
                    table.string('mensaje');
                });
            }
        } catch (error) {
            console.log("Crear tabla error: ", error);
        }
    }

    async save(register){
        let id = -1;
        try {
            await this.conexion(this.tabla).insert(register);
            
            let row = await this.conexion(this.tabla).select('id').orderBy('id', 'desc');
            id = row[0].id;
        } catch (error) {
            console.log("Save error: ", error)
        }

        return id;
    }

    getById = async (id)=> {
        let register = null;
        try {
            register = await this.conexion(this.tabla).where({id:id}).first();
        } catch (error) {
            console.log("getById: ", error);
        }

        return register;
    };

    async getAll(){
        let registers = [];
        try {
            registers = await this.conexion(this.tabla);
        } catch (error) {
            console.error("getAll:", error);
        }

        return registers;
    }
    async deleteById(id){
       try {
        await this.conexion(this.tabla).where({id:id}).del();
       } catch (error) {
        console.error("deleteById:", error);
       }
    }
    async deleteAll(){
        try {
            await this.conexion(this.tabla).del();
           } catch (error) {
            console.error("deleteById:", error);
           }
    }
}

module.exports = ContenedorKnex;