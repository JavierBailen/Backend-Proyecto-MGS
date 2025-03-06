const DB = require('../database/db.json');
const {v4: uuid} = require('uuid');
const fs = require('fs');

const saveToDatabase = (database) =>{
    fs.writeFileSync('./src/database/db.json', JSON.stringify(database, null,2), "utf-8")
}

const getUserByUserName = (username) =>{
    return DB.usuarios.find((usuario)=>usuario.username === username)
}

const getUserById = (id) =>{
    return DB.usuarios.find((usuario)=> usuario.id ===id );
}

const registrarUser = (nuevoUser) =>{
    const userExistente = getUserByUserName(nuevoUser);

    if(userExistente){
        throw{
            status: 400,
            message: `El usuario ${nuevoUser.username} ya esta registrado`
        }
    }

    const usuario = {
        id: uuid(),
        username: nuevoUser.username,
        password: nuevoUser.password
    }

    DB.usuarios.push(usuario);
    saveToDatabase(DB);
    return usuario;
}


const loginUser = (username, password) =>{
    const usuario = getUserByUserName(username);

    if(!usuario | usuario.password !== password){
        throw{
            status: 401,
            message: "Usuario o contraseña incorrectos"
        }
    }


    return {id: usuario.id, username: usuario.username, password: usuario.password}
}


module.exports = {
    registrarUser,
    loginUser,
    getUserById
}

