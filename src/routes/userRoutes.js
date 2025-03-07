const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/registro', userController.registro);
router.post('/login', userController.login);
router.get('/:id', userController.getUserById);


module.exports = router;