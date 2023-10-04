"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_Controller_1 = __importDefault(require("../controllers/Product.Controller"));
const Product_Middleware_1 = __importDefault(require("../middlewares/Product.Middleware"));
const User_Middleware_1 = __importDefault(require("../middlewares/User.Middleware"));
const Token_Middleware_1 = __importDefault(require("../middlewares/Token.Middleware"));
const productRouter = (0, express_1.Router)();
const productController = new Product_Controller_1.default();
productRouter
    .get('/', Token_Middleware_1.default.validateUserToken, productController.getAll)
    .post('/', Product_Middleware_1.default.validCreateProd, productController.create)
    .put('/', productController.update)
    .delete('/', User_Middleware_1.default.validAdmin, productController.delete);
exports.default = productRouter;
