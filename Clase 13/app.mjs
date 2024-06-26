import express from 'express';
import dotev from 'dotenv'
import cors from 'cors'
import helmet from 'helmet';
import jwt from 'jsonwebtoken'
import pg from 'pg'
import cookieParser from 'cookie-parser';
import bcryptjs from 'bcryptjs'

dotev.config()
const app = express()

const PORT = process.env.PORT ?? 3000 
const SECRETO = process.env.SECRETO  
const DB_PASS = process.env.DB_PASS  
const DB_NAME = process.env.DB_NAME  
const DB_USER = process.env.DB_USER  

const pool = new pg.Pool({
    password: DB_PASS,
    database: DB_NAME,
    user: DB_USER,
    host:'localhost',
    port:5432
})


const verificarLogin = (req, res, next) => {
    if (req.cookies && req.cookies.auth) {
        const token = req.cookies.auth;
        try {
            jwt.verify(token, SECRETO);
            next(); 
        } catch (error) {
            res.redirect('/');
        }
    } else {
        res.redirect('/'); 
    }
};
app.use(helmet())

//app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const ruta = express.Router()

app.use(ruta)

app.use(express.static('www'))
app.use('/admin',verificarLogin,express.static('admin'))

app.post('/registro',(req,res)=>{
    const {usuario,pass} = req.body
})
app.post('/login',cors(),(req,res) =>{

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
        res.redirect('/admin')
    }else{
        res.redirect('/')
    }
    
    res.send("Login")
})


app.listen(PORT,()=>{
    console.log('El servidor se establecio en el puerto ' + PORT)
})
