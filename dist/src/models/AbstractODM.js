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
    async update(id, obj) {
        const result = this.model.findByIdAndUpdate({ _id: id }, { ...obj }, { new: true });
        return result;
    }
    async insertMany(data) {
        try {
            const insertedDocuments = await this.model.insertMany(data);
            return insertedDocuments;
        }
        catch (error) {
            throw new Error(`Erro ao inserir vários documentos: ${error}`);
        }
    }
    async delete(id) {
        return this.model.findByIdAndDelete(id);
    }
}
exports.default = AbstractODM;
