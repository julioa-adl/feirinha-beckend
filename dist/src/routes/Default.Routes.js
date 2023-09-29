"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Feirinha_Controller_1 = __importDefault(require("../controllers/Feirinha.Controller"));
const defaultRouter = (0, express_1.Router)();
const defaultController = new Feirinha_Controller_1.default();
defaultRouter
    .get('/', defaultController.default);
exports.default = defaultRouter;
