const Contenedor = require('./Contenedor')

const prueba = async ()=>{
    const cont = new Contenedor();
    await cont.init();

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
    console.log("getById (2): ", await cont.getById(2), "\n");
    console.log("deleteById (3): ", await cont.deleteById(3), "\n");
    console.log("getAll: ", await cont.getAll(), "\n");
    console.log("deleteAll: ", await cont.deleteAll(), "\n");
    console.log("getAll: ", await cont.getAll(), "\n");

    //Inserta un elemento al archivo despues de borrarlos todos, para que haya algo en el txt la proxima vez que se ejecute la aplicación
    await cont.save({
        title:'Celular',
        price:500.00,
        thumbnail:'url celular'
    })
}

prueba();