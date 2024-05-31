import express from 'express'


const app = express()

app.use(express.static('front'))




//Ejecuciones, lectura de archivo, base de datos 
const middleware1 = (peticion,respuesta,next)=>{
    console.log('Hola middleware')
    next()
}


const gestionarGET = (peticion,respuesta) =>{
    respuesta.send('Hola get')
}

const gestionarPOST = (peticion,respuesta) =>{
    respuesta.send('Hola post')
}

app.route('/').get(gestionarGET).post(gestionarPOST);

// app.get("/",(peticion,respuesta)=>{

//     //Agregar Content-Type
//     respuesta.send("Hola express con get")
// })
// // //Se ejecuta en cualquier peticion 
// app.use('/',middleware1)

// app.get("/productos",(peticion,respuesta) =>{
//     respuesta.set('Content-Type','text/html;charset=utf-8')
//     respuesta.status(201).send("Hola amigo producto " + peticion.url)
// })


// app.post("/productos",(peticion,respuesta) => {
//     respuesta.send("Hola express con post")
// })

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log('El servidor se creo en el puerto ' + PORT)
})