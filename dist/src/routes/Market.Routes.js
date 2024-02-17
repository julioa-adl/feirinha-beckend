"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Market_Controller_1 = __importDefault(require("../controllers/Market.Controller"));
const User_Middleware_1 = __importDefault(require("../middlewares/User.Middleware"));
const Market_Middleware_1 = __importDefault(require("../middlewares/Market.Middleware"));
const Token_Middleware_1 = __importDefault(require("../middlewares/Token.Middleware"));
const marketRouter = (0, express_1.Router)();
const marketController = new Market_Controller_1.default();
marketRouter
    .get('/', Token_Middleware_1.default.validateUserToken, marketController.getAll)
    .get('/:id', Token_Middleware_1.default.validateUserToken, marketController.getOneById)
    .post('/', Token_Middleware_1.default.validateUserToken, Market_Middleware_1.default.validCreateMarket, marketController.create)
    .put('/', Token_Middleware_1.default.validateUserToken, marketController.update)
    .delete('/', User_Middleware_1.default.validAdmin, marketController.delete);
exports.default = marketRouter;
