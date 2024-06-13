import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import helmet from 'helmet';
import jwt from 'jsonwebtoken'


const app = express()

const PORT = process.env.PORT ?? 3000 
const SECRETO = process.env.SECRETO  

app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(express.static('www'))


app.post('/login',(req,res) =>{

    //Recibir datos del usuario
     const {usuario,pass} = req.body
    //Consulta a la base de datos 
    const BD = {
        usuario: "tato",
        pass: '123'
    }
    if(BD.usuario === usuario && BD.pass === pass){
        const token = jwt.sign({usuario: usuario},SECRETO,{expiresIn:'1m'})
        res.cookie('auth',token,{
            secure:true,
            httpOnly:true,
            sameSite:'strict'
        });
        res.send(token)
    }else{
        res.redirect('/')
    }
    
    res.send("Login")
})


app.listen(PORT,()=>{
    console.log('El servidor se establecio en el puerto ' + PORT)
})
