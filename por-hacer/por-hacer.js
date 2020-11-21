const fs = require('fs');

let listadoPorHacer = [];

// FUNCIONES DB
// 
const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw err;
        console.log('El archivo fue grabado correctamente!');
      });


}

//
const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = []
    }
    


}

// FUNCIONES DE COMANDOS

// función que devuelve el objeto de la tarea
const crear = (descripcion) => {

    cargarDB();
    
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer; 
}


// 
const getListado = () => {
    cargarDB();
    return listadoPorHacer
}

//
const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    if ( index >= 0) {
        listadoPorHacer[index].completado = completado
        guardarDB();
        return true
    } else {
        return false
    }

}

//
const borrar = (descripcion) => {
    cargarDB();

    // de esta forma solo lista los q NO coinciden, asi se puede guardar el listado SIN la tarea que queremos borrar
    let nuevoListado = listadoPorHacer.filter( tarea => {
        return tarea.descripcion !== descripcion;
    })

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}