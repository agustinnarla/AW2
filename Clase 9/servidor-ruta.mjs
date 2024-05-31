import express from 'express'


const app = express()

const general = express.Router()
const autentificacion = express.Router()

general.get('/',(peticion,respuesta)=>{
    respuesta.send('ruta general')
})
autentificacion.get('login',(peticion,respuesta) =>{
    respuesta.send('ruta autenti')
})

app.use(general,autentificacion)

app.listen(3000)