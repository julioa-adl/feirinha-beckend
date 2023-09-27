"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Feirinha_1 = __importDefault(require("../domains/Feirinha"));
const Feirinha_Model_1 = __importDefault(require("../models/Feirinha.Model"));
class FeirinhaService {
    constructor() {
        this.model = new Feirinha_Model_1.default();
    }
    createFeirinhaDomain(feirinha) {
        if (feirinha) {
            return new Feirinha_1.default(feirinha);
        }
        return null;
    }
    async create(feirinha) {
        const register = await this.model.create(feirinha);
        if (register)
            return { type: null, message: 'feirinha salva!' };
        return { type: 500, message: 'Erro ao cadastrar' };
    }
    async getAll() {
        const search = await this.model.findAll();
        if (!search)
            return { type: 404, message: 'nenhuma feirinha encontrada' };
        return { type: null, message: search };
    }
}
exports.default = FeirinhaService;
