import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
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
    } else if (err.name === 'UnauthorizedError' || err.name === 'JsonWebTokenError') {
      response.statusCode = 401;
      response.message = 'No autorizado: ' + err.message;
    } else if (err.name === 'NotFoundError') {
      response.statusCode = 404;
      response.message = 'Recurso no encontrado';
    }
  }

  res.status(response.statusCode).json(response);
};

// Middleware para atrapar rutas no encontradas (404)
export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({
    status: 'error',
    statusCode: 404,
    message: `Ruta ${req.originalUrl} no encontrada`
  });
};
