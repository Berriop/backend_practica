import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extendemos Request para poder incluir el user decodificado
export interface AuthRequest extends Request {
  user?: string | jwt.JwtPayload;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token de acceso ausente o inválido' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET || 'secret_key_por_defecto';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token de acceso inválido o expirado' });
  }
};
