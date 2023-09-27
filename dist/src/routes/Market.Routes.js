"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Market_Controller_1 = __importDefault(require("../controllers/Market.Controller"));
const User_Middleware_1 = __importDefault(require("../middlewares/User.Middleware"));
const Market_Middleware_1 = __importDefault(require("../middlewares/Market.Middleware"));
const marketRouter = (0, express_1.Router)();
const marketController = new Market_Controller_1.default();
marketRouter
    .get('/', marketController.getAll)
    .post('/', Market_Middleware_1.default.validCreateMarket, marketController.create)
    .put('/', User_Middleware_1.default.validAdmin, marketController.update)
    .delete('/', User_Middleware_1.default.validAdmin, marketController.delete);
exports.default = marketRouter;
