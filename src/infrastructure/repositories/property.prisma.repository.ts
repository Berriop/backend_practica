import prisma from '../database/prisma.client';
import {
  PropertyRepository,
  PropertyFilters,
  CreatePropertyDTO,
  UpdatePropertyDTO,
  PaginatedResult
} from '../../domain/repositories/property.repository';
import { PropertyEntity } from '../../domain/entities/property.entity';
import { Prisma } from '@prisma/client';

export class PropertyPrismaRepository implements PropertyRepository {

  async findAll(filters: PropertyFilters = {}): Promise<PaginatedResult<PropertyEntity>> {
    const {
      location,
      minPrice,
      maxPrice,
      available,
      page = 1,
      limit = 10
    } = filters;

    const skip = (page - 1) * limit;

    const where: Prisma.PropertyWhereInput = {};

    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    if (available !== undefined) {
      where.available = available;
    }

    const [total, properties] = await Promise.all([
      prisma.property.count({ where }),
      prisma.property.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'asc' }
      })
    ]);

    const data = properties.map(p => new PropertyEntity(p));

    return {
      data,
      total,
      page,
      limit
    };
  }

  async findById(id: string | number): Promise<PropertyEntity | null> {
    const numericId = Number(id);
    if (isNaN(numericId)) return null;

    const property = await prisma.property.findUnique({
      where: { id: numericId }
    });

    if (!property) return null;

    return new PropertyEntity(property);
  }

  async create(data: CreatePropertyDTO): Promise<PropertyEntity> {
    const property = await prisma.property.create({
      data
    });

    return new PropertyEntity(property);
  }

  async update(id: string | number, data: UpdatePropertyDTO): Promise<PropertyEntity | null> {
    const numericId = Number(id);
    if (isNaN(numericId)) return null;

    try {
      const property = await prisma.property.update({
        where: { id: numericId },
        data
      });
      return new PropertyEntity(property);
    } catch (error) {
      return null;
    }
  }

  async delete(id: string | number): Promise<boolean> {
    const numericId = Number(id);
    if (isNaN(numericId)) return false;

    try {
      await prisma.property.delete({
        where: { id: numericId }
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
