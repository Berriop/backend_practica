import { PropertyEntity } from '../entities/property.entity';

export interface PropertyFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
}

export interface CreatePropertyDTO {
  title: string;
  price: number;
  location: string;
  available: boolean;
}

export interface UpdatePropertyDTO {
  title?: string;
  price?: number;
  location?: string;
  available?: boolean;
}

export abstract class PropertyRepository {
  abstract findAll(filters?: PropertyFilters): Promise<PropertyEntity[]>;
  abstract findById(id: string | number): Promise<PropertyEntity | null>;
  abstract create(data: CreatePropertyDTO): Promise<PropertyEntity>;
  abstract update(id: string | number, data: UpdatePropertyDTO): Promise<PropertyEntity | null>;
  abstract delete(id: string | number): Promise<boolean>;
}
