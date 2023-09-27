"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_Controller_1 = __importDefault(require("../controllers/User.Controller"));
const User_Middleware_1 = __importDefault(require("../middlewares/User.Middleware"));
const Token_Middleware_1 = __importDefault(require("../middlewares/Token.Middleware"));
const userRouter = (0, express_1.Router)();
const userController = new User_Controller_1.default();
userRouter
    .get('/', User_Middleware_1.default.validAdmin, userController.getUsers)
    .post('/', User_Middleware_1.default.validateRegister, userController.create)
    .put('/', Token_Middleware_1.default.validateToken, User_Middleware_1.default.validateUser, userController.update)
    .delete('/', Token_Middleware_1.default.validateToken, User_Middleware_1.default.validateUser, userController.delete);
exports.default = userRouter;
