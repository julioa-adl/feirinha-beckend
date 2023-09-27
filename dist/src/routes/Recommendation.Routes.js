"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Recommendation_Controller_1 = __importDefault(require("../controllers/Recommendation.Controller"));
const User_Middleware_1 = __importDefault(require("../middlewares/User.Middleware"));
const recommendationRouter = (0, express_1.Router)();
const recommendationController = new Recommendation_Controller_1.default();
recommendationRouter
    .get('/', recommendationController.getAll)
    .post('/', recommendationController.create)
    .delete('/', User_Middleware_1.default.validAdmin, recommendationController.delete);
exports.default = recommendationRouter;
