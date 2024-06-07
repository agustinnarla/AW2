import  {  Router} from 'express'
import { pool } from '../coneccion/database.mjs'

const ruta =  Router()


ruta.get('/productos',async(peticion,respuesta)=>{
    const res = await pool.query("SELECT * FROM productos")
    respuesta.json(res.rows)
})

ruta.get('/productos/:id',async(peticion,respuesta) =>{
    const {id} = peticion.params
    const res = await pool.query(`SELECT * FROM productos WHERE id = ${id}`)
    respuesta.json(res.rows)
})

ruta.post('/productos',async(peticion,respuesta) =>{
    const {producto,precio} = peticion.body
    const res = await pool.query("INSERT INTO productos (producto,precio)" + "VALUES ($1,$2)",[producto,precio])
    respuesta.json(res.rows)
})

ruta.delete('/productos/:id',async(peticion,respuesta) =>{
    const {id} = peticion.params
    const res = await pool.query(`DELETE FROM productos WHERE id=${id}` )
    respuesta.json(res.rows)
})

export default ruta;