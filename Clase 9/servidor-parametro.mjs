import express from 'express'

const app = express()

app.get('/productos/:id_producto',(peticion,respueta)=>{
    const id_producto = peticion.params.id_producto
    respueta.send(id_producto)
})
app.get('/productos/:id_producto/colores/:id_color',(peticion,respueta)=>{
    const {id_producto,id_color} = peticion.params
    respueta.send(id_producto,id_color)
})


app.listen(3000)