import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises'
import {join, parse} from 'node:path'
import { match } from 'node:assert';
const puerto = 3000
const rutaApi = 'api/v1'

let productosV1;
// Funciones
const leerArchivoJSON = async ()=>{
    try{
        const ruta = join(rutaApi,'productos.json')
        const datos = await readFile(ruta,'utf-8')
        console.log(datos)
        productosV1 = JSON.parse(datos)
    }catch(error){
        console.error(error)
    }
}
leerArchivoJSON();


const servidor = createServer((peticion, respuesta)=>{
    // respuesta.end(peticion.url)
    const metodo = peticion.method;
    const rutaPeticion = peticion.url;

    // Implementamos las rutas GET
    if(metodo === 'GET'){

        // const url = new URL('http://' + peticion.headers.host + rutaPeticion) 
        
        if(rutaPeticion === '/productos'){
            //Pregunta si cargue el arhivo json
            if(productosV1){
                respuesta.setHeader('Content-Type','application/json')
                respuesta.statusCode = 200
                respuesta.end(JSON.stringify(productosV1))
            }else{
                respuesta.statusCode = 404
                respuesta.end('Contenido no encontrado')
            }
        }
        //encontrar una parte de la ruta
        else if(rutaPeticion.match('/productos')){
            const id = parse(rutaPeticion).base; 
            // console.log(id)
            //find
            const producto =  productosV1.productos.find((producto)=>{
                return Number(producto.id) === Number(id)
            })
            if(producto){

                // console.log(producto)
                const respuestaJson = {
                    producto: [producto]
                }
    
                respuesta.end(JSON.stringify(respuestaJson))
            }
            else{
                respuesta.end('Error')
            }
        }
    }
});


servidor.listen(puerto, () => {
    console.log(`Se ha creado el servidor en la ruta http://localhost:${puerto}/productos`);
});