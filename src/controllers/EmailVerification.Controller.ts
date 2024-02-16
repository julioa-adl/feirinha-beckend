/* eslint-disable max-lines */
import { Request, Response } from 'express';
import IVerificationCode from '../interfaces/IVerificationCode';
import EmailVerificationService from '../services/EmailVerification.Service';
import UserService from '../services/User.Service';

export default class EmailVerificationController {
  public service: EmailVerificationService;
  public userService: UserService;

  constructor() {
    this.service = new EmailVerificationService();
    this.userService = new UserService();
    this.requestEmailVerificationCode = this.requestEmailVerificationCode.bind(this);
  }

  public async requestEmailVerificationCode(req: Request, res: Response) {
    const { email } = req.body;
    try {
        const existingEmail = await this.userService.getByEmail(email)
        if (existingEmail) {
            return res.status(409).json({ message: 'User already registered' }); 
        }
        const sendVerification = await this.service.requestEmailVerificationCode(email)
        return res.status(200).json({ message: 'code has been sent' });
    } catch(err: unknown) {
        return res.status(500).json({
            message: 'Erro ao gerar código', error: String(err),
        });
    }
  }
}
