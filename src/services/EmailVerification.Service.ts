import VerificationCode from '../domains/VerificationCode';
import EmailVerificationModel from '../models/EmailVerification.Model';
import IVerificationCode from '../interfaces/IVerificationCode';
import { sendVerificationCode } from '../config-mail/email';
import crypto from "crypto";

export default class EmailVerificationService {
  public model = new EmailVerificationModel();
  public createVerificationCodeDomain(verificationCode: IVerificationCode | null): VerificationCode | null {
    if (verificationCode) {
      return new VerificationCode(verificationCode);
    }
    return null;
  }

  public async findOne(email: string, verificationCode: string) {
    const emailVerification = await this.model.findOne({ email, verificationCode });
    return emailVerification;
  }
  
  public async requestEmailVerificationCode(email: string) {
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    await this.model.create({ email, verificationCode });

    await sendVerificationCode(email, verificationCode);

    return { type: null, payload: null };
  }

  public async deleteOne(email: string, verificationCode: string) {
    const emailVerification = await this.model.deleteOne({ email, verificationCode });
    return { type: null, payload: null };
  }

}
