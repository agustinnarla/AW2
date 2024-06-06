import  {  Router} from 'express'
import { pool } from '../coneccion/database.mjs'

const ruta =  Router()


ruta.get('/productos',async(peticion,respuesta)=>{
    const respost = await pool.query("SELECT * FROM productos")
    respuesta.send(respost)
})

export default ruta;