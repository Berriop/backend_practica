import { Request, Response } from 'express';
import { PropertyPrismaRepository } from '../../../infrastructure/repositories/property.prisma.repository';
import { GetAllPropertiesUseCase } from '../../../application/use-cases/get-all-properties.usecase';
import { GetPropertyByIdUseCase } from '../../../application/use-cases/get-property-by-id.usecase';
import { CreatePropertyUseCase } from '../../../application/use-cases/create-property.usecase';
import { UpdatePropertyUseCase } from '../../../application/use-cases/update-property.usecase';
import { DeletePropertyUseCase } from '../../../application/use-cases/delete-property.usecase';

// Instanciamos el repositorio de infraestructura usando Prisma
const propertyRepository = new PropertyPrismaRepository();

export class PropertyController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      // Inyección de dependencias en tiempo de ejecución
      const useCase = new GetAllPropertiesUseCase(propertyRepository);
      
      const filters = {
        location: req.query.location as string,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
        available: req.query.available !== undefined ? req.query.available === 'true' : undefined,
        page: req.query.page ? Number(req.query.page) : undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
      };

      const result = await useCase.execute(filters);
      res.status(200).json(result);
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const useCase = new GetPropertyByIdUseCase(propertyRepository);
      const id = req.params.id as string;
      
      const result = await useCase.execute(id);
      res.status(200).json(result);
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const useCase = new CreatePropertyUseCase(propertyRepository);
      const data = req.body;
      
      const result = await useCase.execute(data);
      res.status(201).json(result);
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const useCase = new UpdatePropertyUseCase(propertyRepository);
      const id = req.params.id as string;
      const data = req.body;
      
      const result = await useCase.execute(id, data);
      res.status(200).json(result);
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const useCase = new DeletePropertyUseCase(propertyRepository);
      const id = req.params.id as string;
      
      const result = await useCase.execute(id);
      res.status(200).json({ success: result, message: 'Propiedad eliminada exitosamente' });
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({ message: error.message });
    }
  }
}
