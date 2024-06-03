//Funcion para obtener los datos 
// - Objtener todos los personajes via fetch()
// - Los personajes se deben cargar en memoria una sola vez al inicio del servidor
// - Mapear los personajes y crear un nuevo OBJETO solo las siguientes propiedades: "id", "name", "status", "species", el resto no incluirlas.
let api = '';

const traerDatos = async (peticion,respuesta) => {
    try {

        const { species } = peticion.params;
        let url = 'https://rickandmortyapi.com/api/character';
    
        if (species) {
        url += `?species=${species}`;
        }
    
        const response = await fetch(url);
        
        const datosJSON = await response.json();
        const personajes = datosJSON.results; 
        
        const arregloPersonajes = personajes.map((personaje) => {
            const objetoPersonaje = {
                id: personaje.id,
                name: personaje.name,
                status: personaje.status,
                species: personaje.species
            };
            return objetoPersonaje;
        });

        // Crear JSON
        api = `
            {
                "personajes": ${JSON.stringify(arregloPersonajes)}
            }
        `;
        respuesta.send(JSON.parse(api))
    } catch (error) {
        console.log(error);
    }
};


export {traerDatos}