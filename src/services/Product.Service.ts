import Product from '../domains/Product';
import IProduct from '../interfaces/IProduct';
import ProductModel from '../models/Product.Model';

export default class ProductService {
  public model = new ProductModel();
  public createProductDomain(product: IProduct | null): Product | null {
    if (product) {
      return new Product(product);
    }
    return null;
  }

  public async getOneById(id: string) {
    const product = await this.model.findById(id);
    if (!product) return { type: 404, payload: { token: null } };

    return { type: null, payload: product };
  }

  public async getAll() {
    const allProducts = await this.model.findAll();
    if (!allProducts) return { type: 404, payload: { token: null } };

    return { type: null, payload: allProducts };
  }

  public async create(product: IProduct) {
    const { name, subName, manufacturer, unitSelling,
            code, category, unitMeasure, size, image, lastChange, lastChangeName } = product;

    const existingProd = await this.model.findOne({code: code});
    if (existingProd && code !== 'nocode') return { type: 409, message: 'Product alredy Register'};

    const newProduct = await this.model.create({
      name, subName, manufacturer, unitSelling, category, code, unitMeasure, size, image, lastChange, lastChangeName
    });
    return { type: null, message: newProduct};
  }

  public async update(id: string, obj: object) {
    return await this.model.update(id, obj)
  }

  public async delete(id: string) {
    return await this.model.delete(id)
  }
}