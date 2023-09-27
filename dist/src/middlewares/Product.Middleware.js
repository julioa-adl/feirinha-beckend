"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const condition = (a, b, c, d, e, f, g, h) => a && b && c && d && e && f && g && h;
const validCreateProd = async (req, res, next) => {
    const { name, subName, manufacturer, category, code, unitMeasure, size, image } = req.body;
    if (!condition(name, subName, manufacturer, category, code, unitMeasure, size, image)) {
        return res.status(400).json({ error: 'Faltam informações' });
    }
    next();
};
exports.default = {
    validCreateProd,
};
