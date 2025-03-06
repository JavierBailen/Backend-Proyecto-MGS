const express = require("express");
const router = express.Router();
const metalGearController = require("../controllers/metalGearController");

router.get("/", metalGearController.getAllPersonajes);

router.get("/:personajeId", metalGearController.getOnePersonaje );

router.post("/",metalGearController.addNuevoPersonaje );

router.patch("/:personajeId", metalGearController.updateOnePersonaje);

router.delete("/:personajeId",metalGearController.deletePersonaje);


module.exports = router;