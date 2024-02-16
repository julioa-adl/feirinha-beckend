export default interface IVerificationCode {
    id?: string,
    email: string,
    verificationCode: string,
    createdAt?: Date,
  }