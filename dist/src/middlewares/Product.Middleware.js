"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const condition = (a, b, c, d, e) => a && b && c && d && e;
const validCreateProd = async (req, res, next) => {
    const { name, manufacturer, unitSelling, category, code } = req.body;
    if (!condition(name, manufacturer, unitSelling, category, code)) {
        return res.status(400).json({ error: 'Faltam informações' });
    }
    next();
};
exports.default = {
    validCreateProd,
};
