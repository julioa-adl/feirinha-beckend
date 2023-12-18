"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../domains/Product"));
const Product_Model_1 = __importDefault(require("../models/Product.Model"));
class ProductService {
    constructor() {
        this.model = new Product_Model_1.default();
    }
    createProductDomain(product) {
        if (product) {
            return new Product_1.default(product);
        }
        return null;
    }
    async getAll() {
        const allProducts = await this.model.findAll();
        if (!allProducts)
            return { type: 404, payload: { token: null } };
        return { type: null, payload: allProducts };
    }
    async create(product) {
        const { name, subName, manufacturer, unitSelling, code, category, unitMeasure, size, image } = product;
        const existingProd = await this.model.findOne({ code: code });
        if (existingProd && code !== 'nocode')
            return { type: 409, message: 'Product alredy Register' };
        const newProduct = await this.model.create({
            name, subName, manufacturer, unitSelling, category, code, unitMeasure, size, image
        });
        return { type: null, message: newProduct };
    }
    async update(id, obj) {
        return await this.model.update(id, obj);
    }
    async delete(id) {
        return await this.model.delete(id);
    }
}
exports.default = ProductService;
