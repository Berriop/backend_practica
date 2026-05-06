"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthController {
    async login(req, res) {
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
                isMatch = await bcryptjs_1.default.compare(password, adminPasswordHash);
            }
            else {
                const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
                isMatch = password === defaultPassword;
            }
            if (!isMatch) {
                res.status(401).json({ message: 'Credenciales inválidas' });
                return;
            }
            const secret = process.env.JWT_SECRET || 'secret_key_por_defecto';
            const token = jsonwebtoken_1.default.sign({ email: adminEmail, role: 'admin' }, secret, { expiresIn: '24h' });
            res.status(200).json({
                message: 'Login exitoso',
                token
            });
        }
        catch (error) {
            console.error('Error in login:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}
exports.AuthController = AuthController;
