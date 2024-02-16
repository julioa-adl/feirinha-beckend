"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_Service_1 = __importDefault(require("../services/User.Service"));
const EmailVerification_Service_1 = __importDefault(require("../services/EmailVerification.Service"));
class UserController {
    constructor() {
        this.service = new User_Service_1.default();
        this.verificationCodeService = new EmailVerification_Service_1.default();
        this.getUsers = this.getUsers.bind(this);
        this.getUserById = this.getUserById.bind(this);
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
    async getUserById(req, res) {
        const { userId } = req.params;
        try {
            const user = await this.service.getById(userId); // Substitua pelo método real de busca no seu banco de dados.
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const userWithoutPass = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            };
            res.status(200).json(userWithoutPass);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async create(req, res) {
        const { name, email, password, role, verificationCode } = req.body;
        try {
            const existingEmail = await this.service.getByEmail(email);
            if (existingEmail) {
                return res.status(409).json({ message: 'User already registered' });
            }
            const emailVerificationToken = await this.verificationCodeService.findOne(email, verificationCode);
            if (!emailVerificationToken) {
                return res.status(400).json({ message: 'Verification code incorrect or expired.' });
            }
            else {
                await this.verificationCodeService.deleteOne(email, verificationCode);
            }
            const { payload: { token } } = await this.service.create({ name, email, password, role });
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
            const id = req.params.userId;
            const { ...obj } = req.body;
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
            const id = req.params.userId;
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
