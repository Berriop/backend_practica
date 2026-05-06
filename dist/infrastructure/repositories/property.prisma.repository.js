"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyPrismaRepository = void 0;
const prisma_client_1 = __importDefault(require("../database/prisma.client"));
const property_entity_1 = require("../../domain/entities/property.entity");
class PropertyPrismaRepository {
    async findAll(filters = {}) {
        const { location, minPrice, maxPrice, available, page = 1, limit = 10 } = filters;
        const skip = (page - 1) * limit;
        const where = {};
        if (location) {
            where.location = { contains: location, mode: 'insensitive' };
        }
        if (minPrice !== undefined || maxPrice !== undefined) {
            where.price = {};
            if (minPrice !== undefined)
                where.price.gte = minPrice;
            if (maxPrice !== undefined)
                where.price.lte = maxPrice;
        }
        if (available !== undefined) {
            where.available = available;
        }
        const [total, properties] = await Promise.all([
            prisma_client_1.default.property.count({ where }),
            prisma_client_1.default.property.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            })
        ]);
        const data = properties.map(p => new property_entity_1.PropertyEntity(p));
        return {
            data,
            total,
            page,
            limit
        };
    }
    async findById(id) {
        const numericId = Number(id);
        if (isNaN(numericId))
            return null;
        const property = await prisma_client_1.default.property.findUnique({
            where: { id: numericId }
        });
        if (!property)
            return null;
        return new property_entity_1.PropertyEntity(property);
    }
    async create(data) {
        const property = await prisma_client_1.default.property.create({
            data
        });
        return new property_entity_1.PropertyEntity(property);
    }
    async update(id, data) {
        const numericId = Number(id);
        if (isNaN(numericId))
            return null;
        try {
            const property = await prisma_client_1.default.property.update({
                where: { id: numericId },
                data
            });
            return new property_entity_1.PropertyEntity(property);
        }
        catch (error) {
            return null;
        }
    }
    async delete(id) {
        const numericId = Number(id);
        if (isNaN(numericId))
            return false;
        try {
            await prisma_client_1.default.property.delete({
                where: { id: numericId }
            });
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
exports.PropertyPrismaRepository = PropertyPrismaRepository;
