"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePropertyUseCase = void 0;
class DeletePropertyUseCase {
    propertyRepository;
    constructor(propertyRepository) {
        this.propertyRepository = propertyRepository;
    }
    async execute(id) {
        // Verificamos si la propiedad existe antes de intentar eliminar
        const existingProperty = await this.propertyRepository.findById(id);
        if (!existingProperty) {
            const error = new Error(`Property with id ${id} not found`);
            error.statusCode = 404;
            throw error;
        }
        return this.propertyRepository.delete(id);
    }
}
exports.DeletePropertyUseCase = DeletePropertyUseCase;
