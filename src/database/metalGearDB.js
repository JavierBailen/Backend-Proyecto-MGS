const DB = require('./db.json');
const fs = require("fs");


const saveToDatabase = (database)=>{
    fs.writeFileSync("./src/database/db.json", JSON.stringify(database, null, 2), "utf-8");
}

const getAllPersonajes = (parametroFiltrado)=>{
    try{
        //return DB.personajes;
        let personajes = DB.personajes;
        if (parametroFiltrado.nombre) {
            return DB.personajes.filter((personaje) => 
                personaje.nombre.toLowerCase().includes(parametroFiltrado.nombre.toLowerCase())
            );
        }
        return personajes;
    }catch(error){
        throw {status: 500, message:error};
    }
    
}

const addNuevoPersonaje = (nuevoPersonaje)=>{
    const personajeYaAniadido = DB.personajes.findIndex((personaje)=>personaje.nombre === nuevoPersonaje.nombre) >-1;

    if(personajeYaAniadido){
        throw{
            status: 400,
            message: `Personaje con el nombre ${nuevoPersonaje.nombre} ya existe`,
        }
    }

    try{
        DB.personajes.push(nuevoPersonaje);
        saveToDatabase(DB);
        return nuevoPersonaje;
    }catch(error){
        throw {status: 500, message: error?.message || error};
    }
}

const getOnePersonaje = (personajeId)=>{
    try{
        const personaje = DB.personajes.find((personaje)=>personaje.id === personajeId);
        if(!personaje){
            throw{
                status: 400,
                message:  `No se encuentra personaje con el id ${personajeId}`
            }
        }
        return personaje;
    }catch(error){
        throw {status: error?.status || 500, message: error?.message || error};
    }
    
    
}

const updateOnePersonaje = (personajeId, changes)=>{

    try{
        const personajeYaAniadido = DB.personajes.findIndex((personaje)=>personaje.nombre === changes.nombre) >-1;
        if(personajeYaAniadido){
            throw{
                status: 400,
                message: `El personaje con el nombre ${changes.nombre} ya existe`
            }
        }

        const indexUpdate = DB.personajes.findIndex((personaje)=>personaje.id === personajeId);
        if(indexUpdate===-1){
            throw{
                status: 400,
                message: `No se puede encontrar el personaje con el id ${personajeId}`
            }
        }
        const personajeUpdated = {
            ...DB.personajes[indexUpdate],
            ...changes,
            updatedAt: new Date().toLocaleString("en-US", {timeZone:"UTC"})
        }
        DB.personajes[indexUpdate] = personajeUpdated;
        saveToDatabase(DB);
        return personajeUpdated;


    }catch(error){
        throw {status: error?.status || 500, message: error?.message || error}
    }
    
    
    

    
    
}

const deletePersonaje = (personajeId)=>{
    try{
        const indexDelete = DB.personajes.findIndex((personaje)=>personaje.id ===personajeId);
        if(indexDelete===-1){
            throw{
                status: 400,
                message: `No se puede encontrar al personaje con el id ${personajeId}`
            }
        }
        DB.personajes.splice(indexDelete, 1);
        saveToDatabase(DB);
    }catch(error){
        throw {status: error?.status || 500, message: error?.message || error}
    }
    

    
}


module.exports = {
    getAllPersonajes,
    addNuevoPersonaje,
    getOnePersonaje,
    updateOnePersonaje,
    deletePersonaje
}