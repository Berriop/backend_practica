"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    // Para errores de desarrollo/producción
    const response = {
        status: 'error',
        statusCode,
        message: err.message || 'Error interno del servidor',
        // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    };
    // Mapeo básico de algunos errores conocidos si no tienen statusCode
    if (!err.statusCode) {
        if (err.name === 'ValidationError' || err.name === 'ZodError') {
            response.statusCode = 400;
            response.message = 'Error de validación: ' + err.message;
        }
        else if (err.name === 'UnauthorizedError' || err.name === 'JsonWebTokenError') {
            response.statusCode = 401;
            response.message = 'No autorizado: ' + err.message;
        }
        else if (err.name === 'NotFoundError') {
            response.statusCode = 404;
            response.message = 'Recurso no encontrado';
        }
    }
    res.status(response.statusCode).json(response);
};
exports.errorMiddleware = errorMiddleware;
// Middleware para atrapar rutas no encontradas (404)
const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({
        status: 'error',
        statusCode: 404,
        message: `Ruta ${req.originalUrl} no encontrada`
    });
};
exports.notFoundMiddleware = notFoundMiddleware;
