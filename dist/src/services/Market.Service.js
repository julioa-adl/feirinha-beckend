"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Market_Model_1 = __importDefault(require("../models/Market.Model"));
const Market_1 = __importDefault(require("../domains/Market"));
class MarketService {
    constructor() {
        this.model = new Market_Model_1.default();
    }
    createMarketDomain(market) {
        if (market) {
            return new Market_1.default(market);
        }
        return null;
    }
    async getAll() {
        const allMarket = await this.model.findAll();
        if (!allMarket)
            return { type: 404, payload: { token: null } };
        return { type: null, payload: allMarket };
    }
    async getOneById(id) {
        const product = await this.model.findById(id);
        if (!product)
            return { type: 404, payload: { token: null } };
        return { type: null, payload: product };
    }
    async create(market) {
        const { name, address, neighborhood, city, state } = market;
        const existingMarket = await this.model.findOne({ name: name, address: address, neighborhood: neighborhood });
        if (existingMarket)
            return { type: 409, message: 'Marketing alredy register' };
        const newMarket = await this.model.create({ name, address, neighborhood, city, state });
        return { type: null, message: `Marketing ${newMarket.name} successfully registered` };
    }
    async update(id, obj) {
        return await this.model.update(id, obj);
    }
    async delete(id) {
        return await this.model.delete(id);
    }
}
exports.default = MarketService;
