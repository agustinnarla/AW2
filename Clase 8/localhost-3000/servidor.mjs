import http from 'node:http'
import fsp from 'node:fs/promises'
import  path from 'node:path'

const puerto = 3000
const rutaApi = 'api/v1'

let productos

const leerArchivo = async () =>{
    try{
        const ruta = path.join( rutaApi, 'productos.json')
        const datos = await fsp.readFile(ruta,'utf-8')
        productos = JSON.parse(datos)
        console.log(productos)

        //find()
    }catch (error){
        console.log(error)
    }
}

leerArchivo()

const servidor = http.createServer((peticion,respuesta) =>{

    const rutaPeticion = peticion.url

    if(peticion.method === 'GET'){
        const url = new URL('http://' + peticion.headers.host + rutaPeticion)
        const ruta = parse(rutaPeticion)
        console.log(url,ruta)
        console.log(peticion.headers.host)
        if(rutaPeticion === '/productos'){
            if(productos){
                respuesta.statusCode = 200
                respuesta.setHeader('Content-Type','application/json')
                respuesta.end(JSON.stringify(productos))
            }
            else{
                respuesta.statusCode = 404;
                console.error("Error en el servidor")

            }
        }
    }
})


servidor.listen(puerto, () => {
    console.log(`Se ha creado el servidor en la ruta http://localhost:${puerto}`);
});