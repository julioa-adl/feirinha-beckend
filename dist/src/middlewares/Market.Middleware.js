"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const condition = (a, b, c, d, e) => a && b && c && d && e;
const validCreateMarket = async (req, res, next) => {
    const { name, address, neighborhood, city, state } = req.body;
    if (!condition(name, address, neighborhood, city, state)) {
        return res.status(400).json({ error: 'Faltam informações' });
    }
    next();
};
exports.default = {
    validCreateMarket,
};
