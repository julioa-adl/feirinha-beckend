import IProduct from '../interfaces/IProduct';

export default class Product {
  protected id?: string;
  protected name: string;
  protected subName?: string;
  protected manufacturer: string;
  protected unitSelling: string;
  protected category: string;
  protected code: string;
  protected unitMeasure?: string;
  protected size?: number;
  protected image?: string;
  protected lastChange: string;
  protected lastChangeName: string;

  constructor(product: IProduct) {
    this.id = product.id;
    this.name = product.name;
    this.subName = product.subName;
    this.manufacturer = product.manufacturer;
    this.unitSelling = product.unitSelling;
    this.category = product.category;
    this.code = product.code;
    this.unitMeasure = product.unitMeasure;
    this.size = product.size;
    this.image = product.image;
    this.lastChange = product.lastChange;
    this.lastChangeName = product.lastChangeName;
  }
}