import { Router } from 'express';
import { PropertyController } from '../controllers/property.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { 
  createPropertySchema, 
  updatePropertySchema, 
  getPropertyByIdSchema, 
  deletePropertySchema, 
  getPropertiesSchema 
} from '../validators/property.validators';

const router = Router();
const propertyController = new PropertyController();

// Rutas de lectura (públicas)
router.get('/', validate(getPropertiesSchema), propertyController.getAll.bind(propertyController));
router.get('/:id', validate(getPropertyByIdSchema), propertyController.getById.bind(propertyController));

// Rutas de escritura (protegidas por token JWT)
router.post('/', authMiddleware, validate(createPropertySchema), propertyController.create.bind(propertyController));
router.put('/:id', authMiddleware, validate(updatePropertySchema), propertyController.update.bind(propertyController));
router.delete('/:id', authMiddleware, validate(deletePropertySchema), propertyController.delete.bind(propertyController));

export default router;
