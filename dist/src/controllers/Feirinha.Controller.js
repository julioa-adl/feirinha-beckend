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
}
exports.default = FeirinhaController;
