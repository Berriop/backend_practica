import { PropertyRepository, PropertyFilters, PaginatedResult } from '../../domain/repositories/property.repository';
import { PropertyEntity } from '../../domain/entities/property.entity';

export class GetAllPropertiesUseCase {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async execute(filters?: PropertyFilters): Promise<PaginatedResult<PropertyEntity>> {
    return this.propertyRepository.findAll(filters);
  }
}
