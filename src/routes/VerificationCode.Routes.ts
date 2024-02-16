import { Router } from 'express';
import EmailVerificationController from '../controllers/EmailVerification.Controller';

const verificationCodeRouter = Router();
const verificationCodeController = new EmailVerificationController();

verificationCodeRouter
  .post('/', verificationCodeController.requestEmailVerificationCode)

export default verificationCodeRouter;
