"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPropertyByIdUseCase = void 0;
class GetPropertyByIdUseCase {
    propertyRepository;
    constructor(propertyRepository) {
        this.propertyRepository = propertyRepository;
    }
    async execute(id) {
        const property = await this.propertyRepository.findById(id);
        if (!property) {
            const error = new Error(`Property with id ${id} not found`);
            // Adjuntamos el código HTTP 404 al error
            error.statusCode = 404;
            throw error;
        }
        return property;
    }
}
exports.GetPropertyByIdUseCase = GetPropertyByIdUseCase;
