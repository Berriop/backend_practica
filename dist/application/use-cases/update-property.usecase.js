"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePropertyUseCase = void 0;
class UpdatePropertyUseCase {
    propertyRepository;
    constructor(propertyRepository) {
        this.propertyRepository = propertyRepository;
    }
    async execute(id, data) {
        // Verificamos si la propiedad existe antes de intentar actualizar
        const existingProperty = await this.propertyRepository.findById(id);
        if (!existingProperty) {
            const error = new Error(`Property with id ${id} not found`);
            error.statusCode = 404;
            throw error;
        }
        const updatedProperty = await this.propertyRepository.update(id, data);
        if (!updatedProperty) {
            const error = new Error(`Property with id ${id} could not be updated`);
            error.statusCode = 404;
            throw error;
        }
        return updatedProperty;
    }
}
exports.UpdatePropertyUseCase = UpdatePropertyUseCase;
