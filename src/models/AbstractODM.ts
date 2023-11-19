import { model, Model, models, Schema } from 'mongoose';
import { IList } from '../interfaces/IFeirinha';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  async findOne(conditions: Partial<T>): Promise<T | null> {
    return this.model.findOne(conditions);
  }

  async findAll(): Promise<T[]> {
    return this.model.find();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async findByUserId(userId: string): Promise<T[] | null> {
    return this.model.find().where('userId').equals(userId);
  }

  async update(id: string, obj: Partial<T>):
  Promise<T | null> {
    const result = this.model.findByIdAndUpdate(
      { _id: id },
      { ...obj },
      { new: true },
    ); 
    return result;
  }

  async addItemToList(feirinhaId: string, newItem: IList): Promise<T | null> {
    return this.model.findByIdAndUpdate(
      feirinhaId,
      { $push: { listCart: newItem } },
      { new: true }
    );
  }

  async removeItemFromList(feirinhaId: string, itemId: string): Promise<T | null> {
    return this.model.findByIdAndUpdate(
      feirinhaId,
      { $pull: { listCart: { _id: itemId } } },
      { new: true }
    );
  }

  async updateItemInList(feirinhaId: string, itemId: string, updatedItem: Partial<IList>):
  Promise<T | null> {
    return this.model.findByIdAndUpdate(
      feirinhaId,
      { $set: { 'listCart.$[item]': updatedItem } },
      { new: true, arrayFilters: [{ 'item._id': itemId }] }
    );
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }
}

export default AbstractODM;