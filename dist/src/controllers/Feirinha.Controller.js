"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Feirinha_Service_1 = __importDefault(require("../services/Feirinha.Service"));
class FeirinhaController {
    constructor() {
        this.service = new Feirinha_Service_1.default();
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getByUserId = this.getByUserId.bind(this);
        this.getAllByProductId = this.getAllByProductId.bind(this);
        this.default = this.default.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        // CRUD ITENS LISTCART
        this.addItemToList = this.addItemToList.bind(this);
        this.removeItemFromList = this.removeItemFromList.bind(this);
        this.updateItemInList = this.updateItemInList.bind(this);
    }
    async default(req, res) {
        return res.status(200).json({ message: 'servidor no ar' });
    }
    async create(req, res) {
        try {
            const feirinha = req.body;
            const { type, message } = await this.service.create(feirinha);
            if (type) {
                return res.status(type).json({ message });
            }
            return res.status(201).json({ message });
        }
        catch (err) {
            return res.status(500).json({
                message: 'erro ao registrar feirinha',
                error: String(err),
            });
        }
    }
    async getByUserId(req, res) {
        const { userId } = req.params;
        try {
            const { type, message } = await this.service.getByUserId(userId);
            if (!type)
                return res.status(200).json(message);
        }
        catch (err) {
            return res.status(500).json({
                message: 'erro ao buscar no banco',
                error: String(err),
            });
        }
    }
    async getAllByProductId(req, res) {
        const { prodId } = req.params;
        try {
            const { type, message } = await this.service.getAllByProductId(prodId);
            if (!type)
                return res.status(200).json(message);
        }
        catch (err) {
            return res.status(500).json({
                message: 'erro ao buscar no banco',
                error: String(err),
            });
        }
    }
    async getAll(_req, res) {
        try {
            const { type, message } = await this.service.getAll();
            if (!type)
                return res.status(200).json(message);
            return res.status(type).json({ message });
        }
        catch (err) {
            return res.status(500).json({
                message: 'erro ao buscar no banco',
                error: String(err),
            });
        }
    }
    async update(req, res) {
        try {
            const { id, ...obj } = req.body;
            const { type, message } = await this.service.update(id, obj);
            if (!type)
                return res.status(200).json(message);
            return res.status(type).json({ message });
        }
        catch (err) {
            return res.status(500).json({
                message: 'erro ao buscar no banco',
                error: String(err),
            });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.body;
            const result = await this.service.delete(id);
            if (result)
                return res.status(200).json({
                    message: 'feirinha excluida com sucesso'
                });
        }
        catch (err) {
            return res.status(500).json({
                message: 'erro ao deletar feirinha', error: String(err),
            });
        }
    }
    // CRUD ITENS LISTCART
    async addItemToList(req, res) {
        try {
            const { feirinhaId, newItem } = req.body;
            const result = await this.service.addItemToList(feirinhaId, newItem);
            if (result) {
                return res.status(200).json({ message: 'Item adicionado à lista!' });
            }
            return res.status(500).json({ message: 'Erro ao adicionar item à lista' });
        }
        catch (err) {
            return res.status(500).json({
                message: 'Erro ao adicionar item à lista',
                error: String(err),
            });
        }
    }
    async removeItemFromList(req, res) {
        try {
            const { feirinhaId, itemId } = req.body;
            const result = await this.service.removeItemFromList(feirinhaId, itemId);
            if (result) {
                return res.status(200).json({ message: 'Item removido da lista!' });
            }
            return res.status(500).json({ message: 'Erro ao remover item da lista' });
        }
        catch (err) {
            return res.status(500).json({
                message: 'Erro ao remover item da lista',
                error: String(err),
            });
        }
    }
    async updateItemInList(req, res) {
        try {
            const { feirinhaId, itemId, updatedItem } = req.body;
            const { type, message } = await this.service.updateItemInList(feirinhaId, itemId, updatedItem);
            if (type) {
                return res.status(type).json({ message });
            }
            return res.status(200).json({ message });
        }
        catch (err) {
            return res.status(500).json({
                message: 'Erro ao atualizar item na lista',
                error: String(err),
            });
        }
    }
}
exports.default = FeirinhaController;
