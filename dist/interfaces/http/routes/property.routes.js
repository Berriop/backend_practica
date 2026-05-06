"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const property_controller_1 = require("../controllers/property.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const property_validators_1 = require("../validators/property.validators");
const router = (0, express_1.Router)();
const propertyController = new property_controller_1.PropertyController();
// Rutas de lectura (públicas)
router.get('/', (0, validate_middleware_1.validate)(property_validators_1.getPropertiesSchema), propertyController.getAll.bind(propertyController));
router.get('/:id', (0, validate_middleware_1.validate)(property_validators_1.getPropertyByIdSchema), propertyController.getById.bind(propertyController));
// Rutas de escritura (protegidas por token JWT)
router.post('/', auth_middleware_1.authMiddleware, (0, validate_middleware_1.validate)(property_validators_1.createPropertySchema), propertyController.create.bind(propertyController));
router.put('/:id', auth_middleware_1.authMiddleware, (0, validate_middleware_1.validate)(property_validators_1.updatePropertySchema), propertyController.update.bind(propertyController));
router.delete('/:id', auth_middleware_1.authMiddleware, (0, validate_middleware_1.validate)(property_validators_1.deletePropertySchema), propertyController.delete.bind(propertyController));
exports.default = router;
