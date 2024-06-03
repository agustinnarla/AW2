import { Router } from "express";
import { traerDatos} from "../funcion/funciones.mjs";

const ruta = Router()
// - Crear un endpoint "/personajes" que devuelva el JSON
ruta.get('/personajes', traerDatos);
// - Crear un endpoint en el que se pueda consultar por "species"
ruta.get('/personajes/species/:species',traerDatos);

export default ruta;