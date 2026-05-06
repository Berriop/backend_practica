"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./interfaces/http/routes/auth.routes"));
const error_middleware_1 = require("./interfaces/http/middlewares/error.middleware");
const property_routes_1 = __importDefault(require("./interfaces/http/routes/property.routes"));
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT, 10) || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('API REST de gestión de propiedades inmobiliarias');
});
// Rutas
app.use('/api/v1/auth', auth_routes_1.default);
app.use('/api/v1/properties', property_routes_1.default);
// Middleware para manejo de rutas no encontradas (404)
app.use(error_middleware_1.notFoundMiddleware);
// Middleware global de manejo de errores
app.use(error_middleware_1.errorMiddleware);
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
