"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllPropertiesUseCase = void 0;
class GetAllPropertiesUseCase {
    propertyRepository;
    constructor(propertyRepository) {
        this.propertyRepository = propertyRepository;
    }
    async execute(filters) {
        return this.propertyRepository.findAll(filters);
    }
}
exports.GetAllPropertiesUseCase = GetAllPropertiesUseCase;
