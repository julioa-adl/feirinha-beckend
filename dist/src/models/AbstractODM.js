"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class AbstractODM {
    constructor(schema, modelName) {
        this.schema = schema;
        this.modelName = modelName;
        this.model = mongoose_1.models[this.modelName] || (0, mongoose_1.model)(this.modelName, this.schema);
    }
    async create(obj) {
        return this.model.create({ ...obj });
    }
    async findOne(conditions) {
        return this.model.findOne(conditions);
    }
    async findAll() {
        return this.model.find();
    }
    async findById(id) {
        return this.model.findById(id);
    }
    async findByUserId(userId) {
        return this.model.find().where('userId').equals(userId);
    }
    async update(id, obj) {
        const result = this.model.findByIdAndUpdate({ _id: id }, { ...obj }, { new: true });
        return result;
    }
    async addItemToList(feirinhaId, newItem) {
        return this.model.findByIdAndUpdate(feirinhaId, { $push: { listCart: newItem } }, { new: true });
    }
    async removeItemFromList(feirinhaId, itemId) {
        return this.model.findByIdAndUpdate(feirinhaId, { $pull: { listCart: { _id: itemId } } }, { new: true });
    }
    async updateItemInList(feirinhaId, itemId, updatedItem) {
        return this.model.findByIdAndUpdate(feirinhaId, { $set: { 'listCart.$[item]': updatedItem } }, { new: true, arrayFilters: [{ 'item._id': itemId }] });
    }
    async delete(id) {
        return this.model.findByIdAndDelete(id);
    }
}
exports.default = AbstractODM;
