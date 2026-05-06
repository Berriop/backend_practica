import { z } from 'zod';

export const createPropertySchema = z.object({
  body: z.object({
    title: z.string({ message: 'El título es requerido' }),
    price: z.number({ message: 'El precio es requerido' }).positive('El precio debe ser un número positivo'),
    location: z.string({ message: 'La ubicación es requerida' }),
    available: z.boolean().optional(),
  }),
});

export const updatePropertySchema = z.object({
  body: z.object({
    title: z.string().optional(),
    price: z.number().positive('El precio debe ser un número positivo').optional(),
    location: z.string().optional(),
    available: z.boolean().optional(),
  }),
  params: z.object({
    id: z.coerce.number({ message: 'El ID debe ser un número válido' }).int().positive(),
  }),
});

export const getPropertyByIdSchema = z.object({
  params: z.object({
    id: z.coerce.number({ message: 'El ID debe ser un número válido' }).int().positive(),
  }),
});

export const deletePropertySchema = z.object({
  params: z.object({
    id: z.coerce.number({ message: 'El ID debe ser un número válido' }).int().positive(),
  }),
});

export const getPropertiesSchema = z.object({
  query: z.object({
    location: z.string().optional(),
    minPrice: z.coerce.number().positive().optional(),
    maxPrice: z.coerce.number().positive().optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().optional(),
  }).optional(),
});
