"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyController = void 0;
const property_prisma_repository_1 = require("../../../infrastructure/repositories/property.prisma.repository");
const get_all_properties_usecase_1 = require("../../../application/use-cases/get-all-properties.usecase");
const get_property_by_id_usecase_1 = require("../../../application/use-cases/get-property-by-id.usecase");
const create_property_usecase_1 = require("../../../application/use-cases/create-property.usecase");
const update_property_usecase_1 = require("../../../application/use-cases/update-property.usecase");
const delete_property_usecase_1 = require("../../../application/use-cases/delete-property.usecase");
// Instanciamos el repositorio de infraestructura usando Prisma
const propertyRepository = new property_prisma_repository_1.PropertyPrismaRepository();
class PropertyController {
    async getAll(req, res) {
        try {
            // Inyección de dependencias en tiempo de ejecución
            const useCase = new get_all_properties_usecase_1.GetAllPropertiesUseCase(propertyRepository);
            const filters = {
                location: req.query.location,
                minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
                maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
                available: req.query.available !== undefined ? req.query.available === 'true' : undefined,
                page: req.query.page ? Number(req.query.page) : undefined,
                limit: req.query.limit ? Number(req.query.limit) : undefined,
            };
            const result = await useCase.execute(filters);
            res.status(200).json(result);
        }
        catch (error) {
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ message: error.message });
        }
    }
    async getById(req, res) {
        try {
            const useCase = new get_property_by_id_usecase_1.GetPropertyByIdUseCase(propertyRepository);
            const id = req.params.id;
            const result = await useCase.execute(id);
            res.status(200).json(result);
        }
        catch (error) {
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ message: error.message });
        }
    }
    async create(req, res) {
        try {
            const useCase = new create_property_usecase_1.CreatePropertyUseCase(propertyRepository);
            const data = req.body;
            const result = await useCase.execute(data);
            res.status(201).json(result);
        }
        catch (error) {
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ message: error.message });
        }
    }
    async update(req, res) {
        try {
            const useCase = new update_property_usecase_1.UpdatePropertyUseCase(propertyRepository);
            const id = req.params.id;
            const data = req.body;
            const result = await useCase.execute(id, data);
            res.status(200).json(result);
        }
        catch (error) {
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ message: error.message });
        }
    }
    async delete(req, res) {
        try {
            const useCase = new delete_property_usecase_1.DeletePropertyUseCase(propertyRepository);
            const id = req.params.id;
            const result = await useCase.execute(id);
            res.status(200).json({ success: result, message: 'Propiedad eliminada exitosamente' });
        }
        catch (error) {
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ message: error.message });
        }
    }
}
exports.PropertyController = PropertyController;
