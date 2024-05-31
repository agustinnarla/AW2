import express from 'express'

const llaves = {
    L1: false,
    L2: false,
    L3: false,
};
const puertas = {
    P1: false,
    P2: false,
    P3: false,
};

const app = express()
const puerto = 5000

app.get('/frase',(peticion,respuesta){
    if(puertas.P1 && puertas.P2 && puertas.P3){
        respuesta.send("mi frase secreta")
    }
    else{
        respuesta.send("Las puertas estan cerradas locon")
    }
})
app.get('/:coordenada',(peticion,respuesta) =>{
   const {coordenada} = peticion.params
   if(coordenada === '/B2'){
    llaves.L1 = true
    respuesta.send('Encontrado llave 1')
   }
   if(coordenada === '/B4'){
    llaves.L2 = true
    respuesta.send('Encontrado llave 2')
   }
   if(coordenada === '/E3'){
    llaves.L3 = true
    respuesta.send('Encontrado llave 3')
   }
   else{
    console.log('ERROR LOCON')
   }
})

app.post('/coordenadas/:coordenada',(peticion,respuesta) =>{
    const {coordenada} = peticion.params
    if(coordenada === '/F1'){
        if(llaves.L1){
            puertas.P1 = true;
            respuesta.send('Abierta puerta 1');
        }
        else{
            respuesta.send("No tenes la llave")
        }
    }
    if(coordenada === '/A1'){
        if(llaves.L2){
            puertas.P2 = true;
            respuesta.send('Abierta puerta 2');
        }
        else{
            respuesta.send("No tenes la llave")
        }
    }
    if(coordenada === '/C3'){
        if(llaves.L3){
            puertas.P3 = true;
            respuesta.send('Abierta puerta 3');
        }
        else{
            respuesta.send("No tenes la llave")
        }
    }
})


app.listen(puerto)

//servidor.listen(3000);
