"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AbstractODM_1 = __importDefault(require("./AbstractODM"));
class RecommendationModel extends AbstractODM_1.default {
    constructor() {
        const schema = new mongoose_1.Schema({
            userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
            userName: { type: String, required: true },
            productId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
            rating: { type: Number, required: true },
            comment: { type: String, required: true },
            date: { type: Date, required: true },
        });
        super(schema, 'Recommendation');
    }
}
exports.default = RecommendationModel;
