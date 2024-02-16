import { Schema } from 'mongoose';
import IVerificationCode from '../interfaces/IVerificationCode';
import AbstractODM from './AbstractODM';

export default class EmailVerificationModel extends AbstractODM<IVerificationCode> {
  constructor() {
    const schema = new Schema<IVerificationCode>({
      email: { type: String, required: true },
      verificationCode: { type: String, required: true },
      createdAt: { type: Date, default: Date.now, expires: "10m" },
    })
    super(schema, 'EmailVerification');
  }
}