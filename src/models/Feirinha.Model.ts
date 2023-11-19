import { IFeirinha } from '../interfaces/IFeirinha';
import { Schema } from 'mongoose';
import AbstractODM from './AbstractODM';

export default class FeirinhaModel extends AbstractODM<IFeirinha> {
  constructor() {
    const schema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      availableToSpend: { type: Number, required: true },
      marketId: { type: Schema.Types.ObjectId, ref: 'Market', required: true },
      listCart: [{ type: IListSchema, required: true }],
      date: { type: Date, required: true },
    });
    
    super(schema, 'Feirinha')
  }
}

const IListSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true },
  quantity: { type: String, required: true },
  price: { type: String, required: true },
  buyed: { type: Boolean, required: true },
});