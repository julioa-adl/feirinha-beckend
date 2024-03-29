"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Feirinha_Controller_1 = __importDefault(require("../controllers/Feirinha.Controller"));
const Token_Middleware_1 = __importDefault(require("../middlewares/Token.Middleware"));
const User_Middleware_1 = __importDefault(require("../middlewares/User.Middleware"));
const feirinhaRouter = (0, express_1.Router)();
const feirinhaController = new Feirinha_Controller_1.default();
feirinhaRouter
    .get('/', Token_Middleware_1.default.validateUserToken, feirinhaController.getAll)
    .get('/:userId', Token_Middleware_1.default.validateUserToken, User_Middleware_1.default.validateUser, feirinhaController.getByUserId)
    .get('/statistic/:prodId', Token_Middleware_1.default.validateUserToken, feirinhaController.getAllByProductId)
    .post('/:userId', Token_Middleware_1.default.validateUserToken, User_Middleware_1.default.validateUser, feirinhaController.create)
    .put('/:userId', Token_Middleware_1.default.validateUserToken, User_Middleware_1.default.validateUser, feirinhaController.update)
    .delete('/:userId', Token_Middleware_1.default.validateUserToken, User_Middleware_1.default.validateUser, feirinhaController.delete);
exports.default = feirinhaRouter;
