"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateServiceDto = void 0;
const class_validator_1 = require("class-validator");
class CreateServiceDto {
}
exports.CreateServiceDto = CreateServiceDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Nome do serviço inválido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Nome do serviço é obrigatório.' }),
    (0, class_validator_1.Length)(2, 80, { message: 'Nome do serviço deve ter entre 2 e 80 caracteres.' }),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Descrição inválida.' }),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Preço inválido.' }),
    (0, class_validator_1.Min)(0, { message: 'Preço deve ser maior ou igual a 0.' }),
    __metadata("design:type", Number)
], CreateServiceDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'Duração inválida.' }),
    (0, class_validator_1.Min)(1, { message: 'Duração deve ser em minutos (>= 1).' }),
    __metadata("design:type", Number)
], CreateServiceDto.prototype, "duration", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(undefined, { message: 'Profissional (userId) inválido.' }),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "userId", void 0);
//# sourceMappingURL=create-service.dto.js.map