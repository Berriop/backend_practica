"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePropertyUseCase = void 0;
class CreatePropertyUseCase {
    propertyRepository;
    constructor(propertyRepository) {
        this.propertyRepository = propertyRepository;
    }
    async execute(data) {
        return this.propertyRepository.create(data);
    }
}
exports.CreatePropertyUseCase = CreatePropertyUseCase;
