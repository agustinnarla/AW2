import express from 'express'


const app = express()

app.use(express.static('front'))
//Ejecuciones, lectura de archivo, base de datos 
// const middleware1 = (peticion,respuesta,next)=>{
//     console.log('Hola middleware')
//     next()
// }

// app.get("/",(peticion,respuesta)=>{

//     //Agregar Content-Type
//     respuesta.send("Hola express con get")
// })
// //Se ejecuta en cualquier peticion 
// app.use(middleware1)

// app.get("/productos",(peticion,respuesta) =>{
//     respuesta.set('Content-Type','text/html;charset=utf-8')
//     respuesta.status(201).send("Hola amigo producto " + peticion.url)
// })


// app.post("/productos",(peticion,respuesta) => {
//     respuesta.send("Hola express con post")
// })

app.listen(3000)