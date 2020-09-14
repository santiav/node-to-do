const argv = require('./config/yargs').argv
const porHacer = require('./por-hacer/por-hacer')
const colors = require('colors')

let comando = argv._[0]

switch (comando) {

    case 'crear':
        // almacena la ejecución de la función "crear" que está
        // dentro de 'por-hacer.js' que devuelve un obj
        let tarea = porHacer.crear(argv.descripcion)
        
        break;

    case 'listar':

        let listado = porHacer.getListado();

        console.log('===== por hacer ========'.green)
        for (let item of listado) {
            console.log(item.descripcion)
            console.log('Estado: ', item.completado)
        }
        console.log('Mostrar todas las tareas por hacer')
        break;

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado)
        break;

    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion)
        console.log(borrado)
        break;

    default:
        console.log('Comando no reconocido')
}