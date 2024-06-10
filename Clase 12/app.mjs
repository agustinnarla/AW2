import express from 'express'
import 'dotenv/config'
import ruta from './ruta/ruta.mjs'


const app = express()

app.use('/',ruta)
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const PUERTO = process.env.PUERTO || 3000

app.listen(PUERTO,()=>{
    console.log('El servidor se instancio en el puerto ' + PUERTO)
})