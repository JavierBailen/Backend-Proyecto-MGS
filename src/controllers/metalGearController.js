const metalGearService = require('../services/metalGearService');

const getAllPersonajes = (req, res)=>{
    const {nombre} = req.query;
    try{
        //const allPersonajes = metalGearService.getAllPersonajes();
        const allPersonajes = metalGearService.getAllPersonajes({nombre});
        res.send({status:"OK", data:allPersonajes});
    }catch(error){
        res
            .status(error?.status || 500)
            .send({status: "FAILED", data: {error: error?.message || error}})
    }
    
}

const getOnePersonaje = (req,res)=>{
    const{
        params: {personajeId}
    } = req;
    if(!personajeId){
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {error: "El parametro id no puede estar vacio"},
            })
    }
    try{
        const personaje = metalGearService.getOnePersonaje(personajeId);
        res.send({status:"OK", data: personaje})
    }catch(error){
        res 
            .status(error?.status || 500)
            .send({ status: "FAILED", data: {error: error?.message || error}})
    }

    
}

const addNuevoPersonaje = (req,res)=>{
    const {body} = req;
    if(
        !body.nombre ||
        !body.descripcion ||
        !body.imagen 
    ){
        res.status(400).send({
            status: "FAILED",
            data: {
                error: "Te ha faltado alguna key"
            }
        })
    }
    const nuevoPersonaje = {
        nombre: body.nombre,
        descripcion: body.descripcion,
        imagen:body.imagen
    }
    ///
    try{
        const personajeCreado = metalGearService.addNuevoPersonaje(nuevoPersonaje);
        res.send({status: "OK", data: personajeCreado});
    }catch(error){
        res
            .status(error?.status || 500)
            .send({status: "FAILED", data: {error:error?.message || error}});
    }
    
}
const updateOnePersonaje = (req,res)=>{
    const{
        body,
        params: {personajeId}
    } = req;

    if(!personajeId){
        res 
            .status(400)
            .send({
                status: "FAILED",
                data: {error:" El parametro id no puede estar vacio"}
            })
    }
    try{
        const personajeUpdated = metalGearService.updateOnePersonaje(personajeId, body);
        res.send({status: "OK", data: personajeUpdated});
    }catch(error){
        res 
            .status(error?.status || 500)
            .send({status: "FAILED", data: {error: error?.message || error}})
    }
    
}

const deletePersonaje = (req, res)=>{
    const{
        params: {personajeId}
    } = req;
    if(!personajeId){
        res 
            .status(400)
            .send({
                status: "FAILED",
                data: {error: "El parametro id no puede estar vacio"}
            }) 
    }
    try{
        metalGearService.deletePersonaje(personajeId);
        res.status(204).send({status: "OK"});
    }catch(error){
        res 
            .status(error?.status || 500)
            .send({status: "FAILED", data: {error: error?.message || error}})
    }
    
}

module.exports = {
    getAllPersonajes,
    getOnePersonaje,
    addNuevoPersonaje,
    updateOnePersonaje,
    deletePersonaje
}