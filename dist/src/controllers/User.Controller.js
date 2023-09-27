"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_Service_1 = __importDefault(require("../services/User.Service"));
class UserController {
    constructor() {
        this.service = new User_Service_1.default();
        this.getUsers = this.getUsers.bind(this);
        this.create = this.create.bind(this);
        this.login = this.login.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    async getUsers(_req, res) {
        try {
            const { type, payload } = await this.service.getUsers();
            if (type) {
                return res.status(404).json({ message: 'No Users Returned' });
            }
            return res.status(200).json(payload);
        }
        catch (err) {
            return res.status(500).json({
                message: 'Erro ao buscar usuário no banco', error: String(err),
            });
        }
    }
    async create(req, res) {
        try {
            const user = req.body;
            const { type, payload: { token } } = await this.service.create(user);
            if (type) {
                return res.status(409).json({ message: 'User already registered' });
            }
            return res.status(201).json({ token });
        }
        catch (err) {
            return res.status(500).json({
                message: 'Erro ao criar usuário no banco', error: String(err),
            });
        }
    }
    async login(req, res) {
        try {
            const user = req.body;
            const { type, payload: { token } } = await this.service.login(user);
            if (type === 409) {
                return res.status(409).json({ message: 'User does not exist' });
            }
            if (type === 404) {
                return res.status(409).json({ message: 'Incorrect User or Password' });
            }
            return res.status(200).json({ token });
        }
        catch (err) {
            return res.status(500).json({
                message: 'Erro ao fazer solicitação ao banco', error: String(err),
            });
        }
    }
    async update(req, res) {
        try {
            const { id, ...obj } = req.body;
            const findUser = await this.service.getById(id);
            if (!findUser)
                return;
            if (findUser.role === 'Super' && obj.role)
                return res.status(400).json({
                    message: 'Role de Super não pode ser Alterada!'
                });
            const result = await this.service.update(id, obj);
            return res.status(200).json({ message: `Usuário ${result === null || result === void 0 ? void 0 : result.name} atualizado` });
        }
        catch (err) {
            return res.status(500).json({
                message: 'erro ao atualizar usuario', error: String(err),
            });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.body;
            const findUser = await this.service.getById(id);
            if (!findUser)
                return res.status(404).json({
                    message: 'Usuário não existe'
                });
            if (findUser.role === 'Super')
                return res.status(400).json({
                    message: 'Usuário Super não pode ser Deletado!'
                });
            const result = await this.service.deleteUser(id);
            if (result)
                return res.status(200).json({
                    message: `usuário ${result.name} excluido com sucesso`
                });
        }
        catch (err) {
            return res.status(500).json({
                message: 'erro ao deletar usuário', error: String(err),
            });
        }
    }
}
exports.default = UserController;
