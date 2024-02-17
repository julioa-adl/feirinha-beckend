"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Market_Service_1 = __importDefault(require("../services/Market.Service"));
class MarketController {
    constructor() {
        this.service = new Market_Service_1.default();
        this.getAll = this.getAll.bind(this);
        this.getOneById = this.getOneById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    async getAll(_req, res) {
        try {
            const { type, payload } = await this.service.getAll();
            if (type) {
                return res.status(404).json({ message: 'No Markets Returned' });
            }
            return res.status(200).json(payload);
        }
        catch (err) {
            return res.status(500).json({
                message: 'Erro ao buscar mercados no banco', error: String(err),
            });
        }
    }
    async getOneById(req, res) {
        const { id } = req.params;
        try {
            const { type, payload } = await this.service.getOneById(id);
            if (type) {
                return res.status(404).json({ message: 'Market not found' });
            }
            return res.status(200).json(payload);
        }
        catch (err) {
            return res.status(500).json({
                message: 'Erro ao buscar mercado no banco', error: String(err),
            });
        }
    }
    async create(req, res) {
        try {
            const marketInformation = req.body;
            const { type, message } = await this.service.create(marketInformation);
            if (type) {
                return res.status(type).json({ message });
            }
            return res.status(201).json({ message });
        }
        catch (err) {
            return res.status(500).json({
                message: 'erro ao registrar mercado',
                error: String(err),
            });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.body;
            const result = await this.service.delete(id);
            return res.status(200).json({ message: `${result} excluido com sucesso` });
        }
        catch (err) {
            return res.status(500).json({
                message: 'erro ao deletar mercado',
                error: String(err),
            });
        }
    }
    async update(req, res) {
        try {
            const { id, ...obj } = req.body;
            const result = await this.service.update(id, obj);
            return res.status(200).json({ message: `Mercado ${result === null || result === void 0 ? void 0 : result.name} atualizado` });
        }
        catch (err) {
            return res.status(500).json({
                message: 'erro ao atualizar mercado', error: String(err),
            });
        }
    }
}
exports.default = MarketController;
