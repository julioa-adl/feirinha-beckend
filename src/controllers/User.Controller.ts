/* eslint-disable max-lines */
import { Request, Response } from 'express';
import IUser from '../interfaces/IUser';
import ILogin from '../interfaces/ILogin';
import UserService from '../services/User.Service';
import EmailVerificationService from '../services/EmailVerification.Service';

export default class UserController {
  public service: UserService;
  public verificationCodeService: EmailVerificationService;

  constructor() {
    this.service = new UserService();
    this.verificationCodeService = new EmailVerificationService();
    this.getUsers = this.getUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.create = this.create.bind(this);
    this.login = this.login.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async getUsers(_req: Request, res: Response) {
    try {
      const { type, payload } = await this.service.getUsers();
      if (type) {
        return res.status(404).json({ message: 'No Users Returned' }); 
      } 
      return res.status(200).json(payload);
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'Erro ao buscar usuário no banco', error: String(err),
      });
    }
  }

  public async getUserById(req: Request, res: Response) {
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
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async create(req: Request, res: Response) {
    const { name, email, password, role, verificationCode } = req.body;
    try {
      const existingEmail = await this.service.getByEmail(email)
        if (existingEmail) {
            return res.status(409).json({ message: 'User already registered' }); 
        }

      const emailVerificationToken = await this.verificationCodeService.findOne( email, verificationCode );
      if (!emailVerificationToken) {
          return res.status(400).json({ message: 'Verification code incorrect or expired.' });
      } else {
          await this.verificationCodeService.deleteOne( email, verificationCode );
      }

      const { payload: { token } } = await this.service.create({ name, email, password, role });
      
      return res.status(201).json({ token });
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'Erro ao criar usuário no banco', error: String(err),
      });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const user: ILogin = req.body;
      const { type, payload: { token } } = await this.service.login(user);
      if (type === 409) {
        return res.status(409).json({ message: 'User does not exist' }); 
      } if (type === 404) {
        return res.status(409).json({ message: 'Incorrect User or Password' }); 
      }
      return res.status(200).json({ token });
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'Erro ao fazer solicitação ao banco', error: String(err),
      });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id = req.params.userId;
      const {...obj} = req.body;
      const findUser = await this.service.getById(id);
      if (!findUser) return;
      if (findUser.role === 'Super' && obj.role) return res.status(400).json({
        message: 'Role de Super não pode ser Alterada!'})
      const result = await this.service.update(id, obj);
      return res.status(200).json({ message: `Usuário ${result?.name} atualizado`});
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'erro ao atualizar usuario', error: String(err),
      })
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id = req.params.userId;
      const findUser = await this.service.getById(id);
      if (!findUser) return res.status(404).json({
        message: 'Usuário não existe'});
      if (findUser.role === 'Super') return res.status(400).json({
        message: 'Usuário Super não pode ser Deletado!'})
      const result = await this.service.deleteUser(id);
      if (result) return res.status(200).json({ 
        message: `usuário ${result.name} excluido com sucesso`});
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'erro ao deletar usuário', error: String(err),
      })
    }
  }
}
