const {v4: uuid} = require("uuid");
const Personajes = require("../database/metalGearDB");

const getAllPersonajes = (parametroFiltrado)=>{
    try{
        const allPersonajes = Personajes.getAllPersonajes(parametroFiltrado);
        return allPersonajes;
    }catch(error){
        throw(error);
    }
    
}

const getOnePersonaje=(personajeId)=>{
    try{
        const personaje = Personajes.getOnePersonaje(personajeId);
        return personaje;
    }catch(error){
        throw error;
    }
    
}

const addNuevoPersonaje = (nuevoPersonaje)=>{
    const personajeInsertar = {
        ...nuevoPersonaje,
        id: uuid(),
        createdAt: new Date().toLocaleString("en-US", {timeZone: "UTC"}),
        updatedAt: new Date().toLocaleString("en-US", {timeZone:"UTC"})
    }
    try{
        const personajeCreado = Personajes.addNuevoPersonaje(personajeInsertar);
        return personajeCreado;
    }catch(error){
        throw error;
    }
    
}

const updateOnePersonaje = (personajeId, changes)=>{
    try{
        const updatedPersonaje = Personajes.updateOnePersonaje(personajeId, changes);
        return updatedPersonaje;
    }catch(error){
        throw error;
    }
    
}

const deletePersonaje = (personajeId)=>{
    try{
        Personajes.deletePersonaje(personajeId);
    }catch(error){
        throw error;
    }
    
}

module.exports = {
    getAllPersonajes,
    getOnePersonaje,
    addNuevoPersonaje,
    updateOnePersonaje,
    deletePersonaje
}