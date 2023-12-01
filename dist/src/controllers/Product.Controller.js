"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_Service_1 = __importDefault(require("../services/Product.Service"));
class ProductController {
    constructor() {
        this.service = new Product_Service_1.default();
        this.getAll = this.getAll.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    async getAll(_req, res) {
        try {
            const { type, payload } = await this.service.getAll();
            if (type) {
                return res.status(404).json({ message: 'No Products Returned' });
            }
            return res.status(200).json(payload);
        }
        catch (err) {
            return res.status(500).json({
                message: 'Erro ao buscar produtos no banco', error: String(err),
            });
        }
    }
    async create(req, res) {
        try {
            const product = req.body;
            const { type, message } = await this.service.create(product);
            if (type) {
                return res.status(type).json(message);
            }
            return res.status(201).json({ message });
        }
        catch (err) {
            return res.status(500).json({
                message: 'erro ao registrar novo produto', error: String(err),
            });
        }
    }
    async update(req, res) {
        try {
            const { id, ...obj } = req.body;
            const result = await this.service.update(id, obj);
            return res.status(200).json({ message: `${result === null || result === void 0 ? void 0 : result.name} atualizado` });
        }
        catch (err) {
            return res.status(500).json({
                message: 'erro ao atualizar produto', error: String(err),
            });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.body;
            const result = await this.service.delete(id);
            if (result)
                return res.status(200).json({
                    message: `produto ${result.name}-${result.subName}-${result.size}${result.unitMeasure}
da ${result.manufacturer} excluido com sucesso`
                });
        }
        catch (err) {
            return res.status(500).json({
                message: 'erro ao deletar produto', error: String(err),
            });
        }
    }
}
exports.default = ProductController;
