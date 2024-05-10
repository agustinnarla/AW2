import {createServer} from 'node:http';
import {readFile,writeFile} from 'node:fs/promises'
import {join, parse} from 'node:path'


const puerto = 3000
const rutaApi = 'api/v1'
const rutaJson = 'api/v1/productos.json'

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
    else if (metodo === 'POST'){
        //USUARIO NOS ENVIA NUEVOS DATOS, REGISTRAR EN EL JSON
        let datos = ''
        peticion.on('data', (pedacito) =>{
            datos += pedacito
        })
        peticion.on('error',(err) =>{
            console.error(err)      
            respuesta.setHeader('Content-type','text/plain')
            respuesta.statusCode = 500
            respuesta.end('Error')
        })
        peticion.on('end', async()=>{
            try{

                respuesta.setHeader('Content-type','application/json')
                const nuevoProducto = JSON.parse(datos)
                productosV1.producto.push(nuevoProducto)       
                await writeFile(rutaJson,JSON.stringify(datos)) 
                respuesta.statusCode = 200  
                respuesta.end(datos)
            }
            catch(error){
                respuesta.statusCode = 201
                respuesta.end(error)
            }
        })

    }   
    else {
        
        respuesta.setHeade('Content-Type','text/plain')
        respuesta.statusCode = 404
        respuesta.end('MAN ERROR')
    }
});


servidor.listen(puerto, () => {
    console.log(`Se ha creado el servidor en la ruta http://localhost:${puerto}/productos`);
});