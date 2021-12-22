/**
 * Hay 3 tipos de almacenamiento
 * 1- Archivos
 * 2- Sqlite3
 * 3- MariaDB
 * 
 * descomentar uno y comentar los otros para realizar las pruebas
 */

const Contenedor = require('./Contenedor');
const ContenedorKnex = require('./ContenedorKnex');

const prueba = async ()=>{
    ////1- Archivos *****************************************
    //const cont = new Contenedor();
    //await cont.init();
    //// Fin 1- Archivos ************************************

    //2- Sqlite3 ***********************************************
    let cnnSqlite3 = require('knex')({
        client:'sqlite3',
        connection:{filename:'./db/ecomerce.sqlite'}
    });

    const cont = new ContenedorKnex(cnnSqlite3, 'products');
    await cont.init();
    // FIN 2- Sqlite2 ******************************************


    // //3- MariaDb ***********************************************
    // let cnnMariaDB = require('knex')({
    //     client:'mysql',
    //     connection:{
    //         host:'127.0.0.1',
    //         user:'root',
    //         password:'1234',
    //         database:'knex'
    //     }
    // });

    // const cont = new ContenedorKnex(cnnMariaDB, 'products');
    // await cont.init();
    // // FIN 3- MariaDB ******************************************

    const idSave1 = await cont.save({
        title:'Guitarra',
        price:300.00,
        thumbnail:'url guitarra'
    })

    console.log("save id: ", idSave1, "\n");

    await cont.save({
        title:'Computadora',
        price:1000.00,
        thumbnail:'url computadora'
    })

    await cont.save({
        title:'Monitor',
        price:200.00,
        thumbnail:'url monitor'
    })

    console.log("getAll: ", await cont.getAll(), "\n");
    //revisar en bd el id porque es autoincrement
    console.log("getById (2): ", await cont.getById(2), "\n");
    //revisar en bd el id porque es autoincrement
    console.log("deleteById (3): ", await cont.deleteById(3), "\n");
    console.log("getAll: ", await cont.getAll(), "\n");
    console.log("deleteAll: ", await cont.deleteAll(), "\n");
    
    //Inserta un elemento al archivo despues de borrarlos todos, para que haya algo en el txt la proxima vez que se ejecute la aplicación
    await cont.save({
        title:'Celular',
        price:500.00,
        thumbnail:'url celular'
    })
}

prueba();