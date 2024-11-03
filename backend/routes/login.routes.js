const express = require('express');
const router = express.Router();
const loginController = require('../controller/login.controller');

router
    .post('/login', loginController.login)
    .post('/asignarRifa', loginController.asignarRifa)
    .post('/obtenerRifas', loginController.obtenerRifas)
    .post('/register', loginController.register)
    .post('/obtenerRifasPremios', loginController.obtenerRifasPremios)

module.exports = router;