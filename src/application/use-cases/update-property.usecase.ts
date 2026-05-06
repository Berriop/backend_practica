import { PropertyRepository, UpdatePropertyDTO } from '../../domain/repositories/property.repository';
import { PropertyEntity } from '../../domain/entities/property.entity';

export class UpdatePropertyUseCase {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async execute(id: string | number, data: UpdatePropertyDTO): Promise<PropertyEntity> {
    // Verificamos si la propiedad existe antes de intentar actualizar
    const existingProperty = await this.propertyRepository.findById(id);
    
    if (!existingProperty) {
      const error = new Error(`Property with id ${id} not found`);
      (error as any).statusCode = 404;
      throw error;
    }
    
    const updatedProperty = await this.propertyRepository.update(id, data);
    
    if (!updatedProperty) {
      const error = new Error(`Property with id ${id} could not be updated`);
      (error as any).statusCode = 404;
      throw error;
    }
    
    return updatedProperty;
  }
}
