"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Recommendation_1 = __importDefault(require("../domains/Recommendation"));
const Recommendation_Model_1 = __importDefault(require("../models/Recommendation.Model"));
class RecommendationService {
    constructor() {
        this.model = new Recommendation_Model_1.default();
    }
    createRecommendationDomain(recommendation) {
        if (recommendation) {
            return new Recommendation_1.default(recommendation);
        }
        return null;
    }
    async getAll() {
        const allRecommendations = await this.model.findAll();
        if (!allRecommendations)
            return { type: 404, payload: { token: null } };
        return { type: null, payload: allRecommendations };
    }
    async create(recommendation) {
        const { userId, productId, rating, comment, date, userName } = recommendation;
        const newRecommendation = await this.model.create({
            userId, productId, rating, comment, date, userName
        });
        return { type: null, message: `Recommendation ${newRecommendation.id} successfuly registered` };
    }
    async delete(id) {
        return await this.model.delete(id);
    }
}
exports.default = RecommendationService;
