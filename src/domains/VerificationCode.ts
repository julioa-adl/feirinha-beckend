import IVerificationCode from "../interfaces/IVerificationCode";

export default class VerificationCode {
  protected id?: string | undefined;
  protected email: string;
  protected verificationCode: string;
  protected createdAt?: Date | undefined;

  constructor(verificationCode: IVerificationCode) {
    this.id = verificationCode.id;
    this.email = verificationCode.email;
    this.verificationCode = verificationCode.verificationCode;
    this.createdAt = verificationCode.createdAt;
  }
}
