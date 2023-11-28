import { IFeirinha, IList } from '../interfaces/IFeirinha';

export default class Feirinha {
  protected id?: string;
  protected title: string;
  protected userId: string;
  protected availableToSpend: number;
  protected marketId: string;
  protected listCart: IList[];
  protected date: Date;

  constructor(feirinha: IFeirinha) {
    this.id = feirinha.id;
    this.title = feirinha.title;
    this.userId = feirinha.userId;
    this.availableToSpend = feirinha.availableToSpend;
    this.marketId = feirinha.marketId;
    this.listCart = feirinha.listCart;
    this.date = feirinha.date;
  }
}