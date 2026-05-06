import { PropertyRepository } from '../../domain/repositories/property.repository';
import { PropertyEntity } from '../../domain/entities/property.entity';

export class GetPropertyByIdUseCase {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async execute(id: string | number): Promise<PropertyEntity> {
    const property = await this.propertyRepository.findById(id);
    
    if (!property) {
      const error = new Error(`Property with id ${id} not found`);
      // Adjuntamos el código HTTP 404 al error
      (error as any).statusCode = 404;
      throw error;
    }
    
    return property;
  }
}
