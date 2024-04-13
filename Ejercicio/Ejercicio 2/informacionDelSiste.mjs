import os from 'node:os'

//Buscamos la informacion del sitsema 
//Lo paso a cadena
const procesador = JSON.stringify(os.cpus())
const memoriaTotal = os.totalmem()/1024/1024/1024
const memoriaLibre = os.freemem()/1024/1024/1024
const memoriaUsada = memoriaTotal - memoriaLibre


let datos = ''
datos += '------------------------'
//Salto de linea
datos += os.EOL
datos += `Procesador ${os.EOL}${procesador}`
datos += os.EOL
datos += `Memoria Total ${memoriaTotal}`
datos += os.EOL
datos += `Memoria Libre ${memoriaLibre}`
datos += os.EOL
datos += `Memoria Usada ${memoriaUsada}`

export default datos;