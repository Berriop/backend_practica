import { PropertyRepository } from '../../domain/repositories/property.repository';

export class DeletePropertyUseCase {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async execute(id: string | number): Promise<boolean> {
    // Verificamos si la propiedad existe antes de intentar eliminar
    const existingProperty = await this.propertyRepository.findById(id);
    
    if (!existingProperty) {
      const error = new Error(`Property with id ${id} not found`);
      (error as any).statusCode = 404;
      throw error;
    }
    
    return this.propertyRepository.delete(id);
  }
}
