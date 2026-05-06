import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

// Como pasamos el método como referencia, hacemos el bind para no perder el contexto de 'this'
// si es que se usara dentro del controller en el futuro.
router.post('/login', authController.login.bind(authController));

export default router;
