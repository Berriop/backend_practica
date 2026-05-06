"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
// Como pasamos el método como referencia, hacemos el bind para no perder el contexto de 'this'
// si es que se usara dentro del controller en el futuro.
router.post('/login', authController.login.bind(authController));
exports.default = router;
