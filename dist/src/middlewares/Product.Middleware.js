"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const condition = (a, b, c, d) => a && b && c && d;
const validCreateProd = async (req, res, next) => {
    const { name, manufacturer, category, code } = req.body;
    if (!condition(name, manufacturer, category, code)) {
        return res.status(400).json({ error: 'Faltam informações' });
    }
    next();
};
exports.default = {
    validCreateProd,
};
