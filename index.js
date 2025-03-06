const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const metalGearRoutes = require("./src/routes/metalGearRoutes");
const userRoutes = require('./src/routes/userRoutes');

/** 
app.get("/", (req, res)=>{
    res.send("<h2>Servidor Funcionando fenomenalmente</h2> ")
})
*/

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({origin: "front-end-proyecto-mgs.vercel.app"}))
app.use(bodyParser.json());
app.use("/api/personajes", metalGearRoutes );
app.use("/api/usuarios", userRoutes);

app.listen(PORT, ()=>{
    console.log(`La api esta escuchando por el puerto ${PORT}`)
})