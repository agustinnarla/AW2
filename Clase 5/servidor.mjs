import http from 'node:http'
import path from 'node:path'
import fsp from 'node:fs/promises'


const publica = 'publica'
const jsonRuta = 'datos'
const puerto = 3000

async function index(peticion,respuesta){

    try{
        const ruta = path.join(publica,'index.html')
        const archivo = await fsp.readFile(ruta)
        //respuesta.setHeader('Content-Type', 'text/html; charset=utf-8')
        respuesta.statusCode = 200;
        respuesta.end(archivo)
    }
    catch (err){
        respuesta.statusCode = 500;
        respuesta.end("Error loco")
    }
}

const servidor = http.createServer((peticion,respuesta) => {
    if(peticion.method === "GET"){

        if(peticion.url === 'index.html' || peticion.url === "/"){
            index(peticion,respuesta)
        }
        else if (peticion.url === '/productos'){
            json(respuesta)
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
        respuesta.statusCode = 404;
        respuesta.end("no encontrado")
    }
}

async function json(peticion,respuesta) {
    try{
        const ruta = path.join(jsonRuta,'producto.json')
        const archivo = await fsp.readFile(ruta)
        respuesta.statusCode = 200
        respuesta.end(archivo)

    }catch{
        respuesta.statusCode = 404
        respuesta.end('error')
    }
}

servidor.listen( puerto,() =>{
 console.log(`El servidor se abrio en http://localhost:${puerto}`);
})