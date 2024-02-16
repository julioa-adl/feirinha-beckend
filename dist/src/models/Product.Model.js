"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AbstractODM_1 = __importDefault(require("./AbstractODM"));
class ProductModel extends AbstractODM_1.default {
    constructor() {
        const schema = new mongoose_1.Schema({
            lastChange: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
            name: { type: String, required: true },
            subName: { type: String },
            manufacturer: { type: String, required: true },
            unitSelling: { type: String, required: true },
            category: { type: String, required: true },
            code: { type: String, required: true },
            unitMeasure: { type: String },
            size: { type: Number },
            image: { type: String },
        });
        super(schema, 'Product');
    }
}
exports.default = ProductModel;
