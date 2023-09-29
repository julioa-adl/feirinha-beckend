"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.SECRET_KEY;
const jwtConfig = {
    algorithm: 'HS256',
    expiresIn: '7d',
};
const createToken = (userWithoutPassword) => {
    const token = jsonwebtoken_1.default.sign({ data: userWithoutPassword }, secret, jwtConfig);
    return token;
};
exports.createToken = createToken;
const verifyToken = (authorization) => {
    try {
        const payload = jsonwebtoken_1.default.verify(authorization, secret);
        return payload.data;
    }
    catch (erro) {
        return { isError: true, erro };
    }
};
exports.verifyToken = verifyToken;
