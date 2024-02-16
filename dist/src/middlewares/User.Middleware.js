"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwtFunctions_1 = require("../auth/jwtFunctions");
const validateUser = async (req, res, next) => {
    const { role, name } = req.body;
    const paramsId = req.params.userId;
    const verify = await (0, jwtFunctions_1.verifyToken)(req.headers.authorization);
    if (role === 'Super' || name === 'Super') {
        return res.status(400).json({ error: 'Só Existe Um Super, e Ele não compartilha O PODER' });
    }
    if (role && verify.role !== 'Super') {
        return res.status(401).json({ error: 'Apenas o Super pode alterar Role de usuários' });
    }
    if (verify._id === paramsId || verify.role === 'Admin' || verify.role === 'Super') {
        return next();
    }
    return res.status(401).json({ error: 'Permission Danied - No Changes' });
};
const validateRegister = async (req, res, next) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: 'Faltam informações' });
    }
    if (role !== 'User') {
        return res.status(401).json({ error: 'Você não tem permissão para cadastrar admins' });
    }
    if (name === 'Super') {
        return res.status(401).json({ error: 'Só Existe Um Super, e Ele não compartilha O PODER' });
    }
    next();
};
const validSuper = async (req, res, next) => {
    const verify = await (0, jwtFunctions_1.verifyToken)(req.headers.authorization);
    if (verify.role === 'Super') {
        return next();
    }
    return res.status(401).json({ error: 'YOU HAVE NO POWER HERE' });
};
const validAdmin = async (req, res, next) => {
    const verify = await (0, jwtFunctions_1.verifyToken)(req.headers.authorization);
    if (verify.role === 'Admin' || verify.role === 'Super') {
        return next();
    }
    return res.status(401).json({ error: 'YOU HAVE NO POWER HERE' });
};
exports.default = {
    validateUser,
    validateRegister,
    validSuper,
    validAdmin,
};
