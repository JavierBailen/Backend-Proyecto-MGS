const userService = require('../services/userService');

const registro = (req, res) =>{

    const {username, password} = req.body;

    if(!username || !password){
        res.status(400).send({
            status: "Failed",
            data: {error: "Debes enviar username y contraseña"}
        })
        return;
    }

    try{
        const nuevoUser = userService.registrarUser({username,password});
        res.status(200).send({status: "OK", data: nuevoUser})

    }catch(error){
        res.status(error?.status || 500).send({
            status: "Failed",
            data: {error: error?.message ||error}
        })
    }
}


const login = (req, res) =>{
    const {username, password} = req.body;

    if(!username || !password){
        res.status(400).send({
            status: "Failed",
            data: {error: "Debes enviar username y contraseña"}
        })
        return;
    }

    try{
        const usuario = userService.loginUser(username, password);
        res.send({status: "OK", data: usuario})
    }catch(error){
        res.status(error?.status || 500).send({
            status: "FALLO",
            data: {error: error?.message || error }
        })
    }
}


getUserById = (req, res) =>{
    const {id} = req.params;

    try{
        const usuario = userService.getUserById(id);
        res.send({status:"OK", data: usuario})
    }catch(error){
        res.status(500).send({
            status: "FALLO",
            data: {error: error?.message || error}
        })
    }
}


module.exports = {
    registro,
    getUserById,
    login,
    
}

