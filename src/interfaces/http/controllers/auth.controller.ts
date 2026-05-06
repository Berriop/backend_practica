import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export class AuthController {
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
      const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

      if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
      }

      if (email !== adminEmail) {
        res.status(401).json({ message: 'Credenciales inválidas' });
        return;
      }

      let isMatch = false;
      
      // Si ADMIN_PASSWORD_HASH está definido, usamos bcrypt.
      // Si no, hacemos validación directa con una contraseña por defecto ('admin123')
      if (adminPasswordHash) {
        isMatch = await bcrypt.compare(password, adminPasswordHash);
      } else {
        const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
        isMatch = password === defaultPassword;
      }

      if (!isMatch) {
        res.status(401).json({ message: 'Credenciales inválidas' });
        return;
      }

      const secret = process.env.JWT_SECRET || 'secret_key_por_defecto';
      const token = jwt.sign(
        { email: adminEmail, role: 'admin' },
        secret,
        { expiresIn: '24h' }
      );

      res.status(200).json({
        message: 'Login exitoso',
        token
      });
    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}
