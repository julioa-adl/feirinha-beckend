"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwtFunctions_1 = require("../auth/jwtFunctions");
const condition = (a, b, c, d) => a && b && c && d;
const validateToken = async (req, res, next) => {
    const verify = await (0, jwtFunctions_1.verifyToken)(req.headers.authorization);
    if (!condition(verify._id, verify.name, verify.email, verify.role)) {
        return res.status(401).json({ error: 'Invalid token!' });
    }
    next();
};
exports.default = {
    validateToken,
};
