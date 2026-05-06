"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPropertiesSchema = exports.deletePropertySchema = exports.getPropertyByIdSchema = exports.updatePropertySchema = exports.createPropertySchema = void 0;
const zod_1 = require("zod");
exports.createPropertySchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ message: 'El título es requerido' }),
        price: zod_1.z.number({ message: 'El precio es requerido' }).positive('El precio debe ser un número positivo'),
        location: zod_1.z.string({ message: 'La ubicación es requerida' }),
        available: zod_1.z.boolean().optional(),
    }),
});
exports.updatePropertySchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        price: zod_1.z.number().positive('El precio debe ser un número positivo').optional(),
        location: zod_1.z.string().optional(),
        available: zod_1.z.boolean().optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.coerce.number({ message: 'El ID debe ser un número válido' }).int().positive(),
    }),
});
exports.getPropertyByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.coerce.number({ message: 'El ID debe ser un número válido' }).int().positive(),
    }),
});
exports.deletePropertySchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.coerce.number({ message: 'El ID debe ser un número válido' }).int().positive(),
    }),
});
exports.getPropertiesSchema = zod_1.z.object({
    query: zod_1.z.object({
        location: zod_1.z.string().optional(),
        minPrice: zod_1.z.coerce.number().positive().optional(),
        maxPrice: zod_1.z.coerce.number().positive().optional(),
        page: zod_1.z.coerce.number().int().positive().optional(),
        limit: zod_1.z.coerce.number().int().positive().optional(),
    }).optional(),
});
