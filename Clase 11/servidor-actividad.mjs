// modulo cors()
// modulo helmet()

// ******************
// Actividad
// ******************
// Crear una API que filtre otra api para simplificar los contenidos
// a entregar a un cliente
// - Utilizar la api rick&morty -> https://rickandmortyapi.com/api/character
// - Analizar el formato entregado para poder desarrollar el script
// - Objtener todos los personajes via fetch()
// - Los personajes se deben cargar en memoria una sola vez al inicio del servidor
// - Mapear los personajes y crear un nuevo OBJETO solo las siguientes propiedades: "id", "name", "status", "species", el resto no incluirlas.
// - Crear un endpoint "/personajes" que devuelva el JSON
// - Crear un endpoint en el que se pueda consultar por "species"
// - Investigar el método json() de express

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config'

import ruta from './ruta/ruta.mjs';


const service = express();

service.use(helmet())
service.use(cors())

// Middleware para analizar JSON
service.use(express.json())

service.use('/',ruta)
// object process
const  PORT = process.env.PORT || 5000

service.listen(PORT,() =>{
    console.log('El servidor se levanto en el puerto ' + PORT)
});