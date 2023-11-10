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
    async getByUserId(userId) {
        const feirinhas = await this.model.findByUserId(userId);
        if (feirinhas)
            return { type: null, message: feirinhas };
        return { type: 404, message: 'nenhuma feirinha encontrada' };
    }
    async getAll() {
        const search = await this.model.findAll();
        if (search)
            return { type: null, message: search };
        return { type: 404, message: 'nenhuma feirinha encontrada' };
    }
    async update(id, obj) {
        const update = await this.model.update(id, obj);
        if (update)
            return { type: null, message: 'feirinha atualizada!' };
        return { type: 500, message: 'Erro ao atualizar' };
    }
    async delete(id) {
        return await this.model.delete(id);
    }
}
exports.default = FeirinhaService;
