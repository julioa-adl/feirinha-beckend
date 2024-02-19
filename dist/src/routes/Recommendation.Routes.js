"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Recommendation_Controller_1 = __importDefault(require("../controllers/Recommendation.Controller"));
const Token_Middleware_1 = __importDefault(require("../middlewares/Token.Middleware"));
const User_Middleware_1 = __importDefault(require("../middlewares/User.Middleware"));
const recommendationRouter = (0, express_1.Router)();
const recommendationController = new Recommendation_Controller_1.default();
recommendationRouter
    .get('/:productId', Token_Middleware_1.default.validateUserToken, recommendationController.getByProductId)
    .post('/', Token_Middleware_1.default.validateUserToken, recommendationController.create)
    .delete('/:userId', Token_Middleware_1.default.validateUserToken, User_Middleware_1.default.validateUser, recommendationController.delete);
exports.default = recommendationRouter;
