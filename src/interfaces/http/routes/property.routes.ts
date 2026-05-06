import { Router } from 'express';
import { PropertyController } from '../controllers/property.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const propertyController = new PropertyController();

// Rutas de lectura (públicas)
router.get('/', propertyController.getAll.bind(propertyController));
router.get('/:id', propertyController.getById.bind(propertyController));

// Rutas de escritura (protegidas por token JWT)
router.post('/', authMiddleware, propertyController.create.bind(propertyController));
router.put('/:id', authMiddleware, propertyController.update.bind(propertyController));
router.delete('/:id', authMiddleware, propertyController.delete.bind(propertyController));

export default router;
