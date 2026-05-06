import { PropertyRepository, CreatePropertyDTO } from '../../domain/repositories/property.repository';
import { PropertyEntity } from '../../domain/entities/property.entity';

export class CreatePropertyUseCase {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async execute(data: CreatePropertyDTO): Promise<PropertyEntity> {
    return this.propertyRepository.create(data);
  }
}
