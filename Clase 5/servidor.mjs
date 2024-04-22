import http from 'node:http'
import path from 'node:path'
import fsp from 'node:fs/promises'
import fs from 'node:fs'

const publica = 'publica'

async function index(peticion,respuesta){

    try{
        const ruta = path.join(publica,'index.html')
        const archivo = await fsp.readFile(ruta)

        respuesta.statusCode = 200;
        respuesta.end(archivo)
    }
    catch (err){
        respuesta.statusCode = 400;
        respuesta.end("Error loo",err)
    }
}

const servidor = http.createServer((peticion,respuesta) => {
    if(peticion.method === "GET"){

        if(peticion.url === 'index.html' || peticion.url === "/"){
            index(peticion,respuesta)
        }
        else {
            recursos(peticion,respuesta)
        }
    }

})

async function recursos(peticion,respuesta) {
    try{

        const ruta = path.join(publica,peticion.url)
        const archivo = await fsp.readFile(ruta)
        respuesta.statusCode = 200;
        respuesta.end(archivo)
    }
    catch(err){
        respuesta.statusCode = 400;
        respuesta.end("no encontrado",err)
    }
}
servidor.listen(3000)