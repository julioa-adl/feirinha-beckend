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
    // CRUD ITENS LISTCART
    async addItemToList(feirinhaId, newItem) {
        const updatedFeirinha = await this.model.addItemToList(feirinhaId, newItem);
        if (updatedFeirinha) {
            return { type: null, message: 'Item adicionado à lista!' };
        }
        else {
            return { type: 500, message: 'Erro ao adicionar item à lista' };
        }
    }
    async removeItemFromList(feirinhaId, itemId) {
        const updatedFeirinha = await this.model.removeItemFromList(feirinhaId, itemId);
        if (updatedFeirinha) {
            return { type: null, message: 'Item removido da lista!' };
        }
        else {
            return { type: 500, message: 'Erro ao remover item da lista' };
        }
    }
    async updateItemInList(feirinhaId, itemId, updatedItem) {
        // Verificar se a feirinha existe
        const feirinha = await this.model.findById(feirinhaId);
        if (!feirinha) {
            return { type: 404, message: 'Feirinha não encontrada' };
        }
        // Verificar se o item com o ID fornecido existe na listaCart
        const existingItem = feirinha.listCart.find((item) => item['_id'] == itemId);
        if (!existingItem) {
            return { type: 404, message: 'Item não encontrado na lista' };
        }
        // Atualizar o item
        const updatedFeirinha = await this.model.updateItemInList(feirinhaId, itemId, updatedItem);
        if (updatedFeirinha) {
            return { type: null, message: 'Item atualizado na lista!' };
        }
        else {
            return { type: 500, message: 'Erro ao atualizar item na lista' };
        }
    }
}
exports.default = FeirinhaService;
