"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Recommendation_Service_1 = __importDefault(require("../services/Recommendation.Service"));
class RecommendationController {
    constructor() {
        this.service = new Recommendation_Service_1.default();
        this.getAll = this.getAll.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
    }
    async getAll(_req, res) {
        try {
            const { type, payload } = await this.service.getAll();
            if (type) {
                return res.status(404).json({ message: 'No Recommendations Returned' });
            }
            return res.status(200).json(payload);
        }
        catch (err) {
            return res.status(500).json({
                message: 'Erro ao buscar Recomendações no banco', error: String(err),
            });
        }
    }
    async create(req, res) {
        const recommendation = req.body;
        if (recommendation.rating > 5 || recommendation.rating < 0)
            return res.status(400).json({ message: 'avaliação deve ser entre 0 e 5' });
        try {
            const { type, message } = await this.service.create(recommendation);
            if (type) {
                return res.status(type).json({ message });
            }
            return res.status(201).json({ message });
        }
        catch (err) {
            return res.status(500).json({
                message: 'erro ao registrar nova recomendação', error: String(err),
            });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.body;
            const result = await this.service.delete(id);
            if (result)
                return res.status(200).json({
                    message: 'recomendação excluida com sucesso'
                });
        }
        catch (err) {
            return res.status(500).json({
                message: 'erro ao deletar recomendação', error: String(err),
            });
        }
    }
}
exports.default = RecommendationController;
