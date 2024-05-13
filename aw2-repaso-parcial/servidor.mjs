import http from 'node:http'
import fsp from 'node:fs/promises'
import path from 'node:path'


const puerto = 3000
const publica = 'publica'
const saludos = 'saludos'

async function traerIndex(respuesta){
    try{
        const ruta = path.join(publica,'index.html')
        const archivo = await fsp.readFile(ruta)
        respuesta.setHeader('Content-Type','text/html;charset=utf-8')
        respuesta.statusCode = 200
        respuesta.end(archivo)
    }catch(err){
        respuesta.setHeader('Content-Type','text/plain')
        respuesta.statusCode = 404
        respuesta.end('Error al buscar el index')
    }
}

async function traerRecursos(peticion,respuesta){
    try{
        const ruta = path.join(publica,peticion.url)
        const archivo = await fsp.readFile(ruta)
        respuesta.statusCode = 200
        respuesta.setHeader('Content-Type','text/css')
        respuesta.end(archivo)
    }
    catch(err){
        respuesta.setHeader('Content-Type','text/plain')
        respuesta.statusCode = 404
        respuesta.end('Error en la busqueda de recursos')
    }
}

const archivo = {
    "saludos" : [
        "Buenos días",
        "Buenas tardes",
        "Buenas noches"
    ]
} 
async function escribirJson(respuesta){

        const ruta = path.join(saludos,'saludos.json')

        try {
            await fsp.writeFile(ruta, JSON.stringify(archivo))
            respuesta.statusCode = 200
            respuesta.setHeader('Content-Type','application/json')
            respuesta.end('Archivo generado')
            
        } catch  {
            respuesta.statusCode = 404
            respuesta.end('Error al generar el archivo')
        }

}



const servidor = http.createServer((peticion,respuesta) => {

    if(peticion.method === 'GET'){
        if(peticion.url === '/'){
            traerIndex(peticion,respuesta)
        }
        else{
            traerRecursos(peticion,respuesta)
        }
    }
    else if(peticion.method === 'POST'){
        if(peticion.url === '/saludos'){
            escribirJson(respuesta)
        }
    }

})






servidor.listen(puerto,()=>{
    console.log(`El servidor se creo en http://localhost:${puerto}`)
})