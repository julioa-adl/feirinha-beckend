"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../domains/User"));
const User_Model_1 = __importDefault(require("../models/User.Model"));
const bcrypt = __importStar(require("bcryptjs"));
const jwtFunctions_1 = require("../auth/jwtFunctions");
class UserService {
    constructor() {
        this.model = new User_Model_1.default();
    }
    createUserDomain(user) {
        if (user) {
            return new User_1.default(user);
        }
        return null;
    }
    async getById(id) {
        const user = await this.model.findById(id);
        return user;
    }
    async getUsers() {
        const allUsers = await this.model.findAll();
        if (!allUsers)
            return { type: 404, payload: { token: null } };
        const listUsers = allUsers.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }));
        return { type: null, payload: listUsers };
    }
    async firstUser() {
        const superUser = {
            name: process.env.USER_SUPER_NAME || 'Super',
            email: process.env.USER_SUPER_EMAIL || 'super@example.com',
            password: process.env.USER_SUPER_PASS || 'super_pass',
            birthday: process.env.USER_SUPER_BTHD || '00-00-0000',
            role: process.env.USER_SUPER_ROLE || 'Super',
        };
        const salt = bcrypt.genSaltSync(10);
        const validPwd = bcrypt.hashSync(superUser.password, salt);
        const allUsers = await this.model.findAll();
        if (allUsers.length === 0) {
            const { name, email, password, birthday, role } = superUser;
            await this.model.create({ name, email, password: validPwd, birthday, role });
        }
    }
    async create(user) {
        await this.firstUser();
        const { name, email, password, birthday, role } = user;
        const existingUser = await this.model.findOne({ email: email });
        if (existingUser)
            return { type: 409, payload: { token: null } };
        const salt = bcrypt.genSaltSync(10);
        const validPwd = bcrypt.hashSync(password, salt);
        const newUser = await this.model.create({ name, email, password: validPwd, birthday, role });
        newUser.password = '';
        const token = (0, jwtFunctions_1.createToken)(newUser);
        return { type: null, payload: { token } };
    }
    async login(user) {
        const { email, password } = user;
        const existingUser = await this.model.findOne({ email: email });
        if (!existingUser)
            return { type: 409, payload: { token: null } };
        const match = await bcrypt.compare(password, existingUser.password);
        if (match) {
            existingUser.password = '';
            const token = (0, jwtFunctions_1.createToken)(existingUser);
            return { type: null, payload: { token } };
        }
        else {
            return { type: 404, payload: { token: null } };
        }
    }
    async update(id, obj) {
        const { password } = obj;
        if (password) {
            const salt = bcrypt.genSaltSync(10);
            const validPwd = bcrypt.hashSync(password, salt);
            obj.password = validPwd;
        }
        return await this.model.update(id, obj);
    }
    async deleteUser(id) {
        return await this.model.delete(id);
    }
}
exports.default = UserService;
