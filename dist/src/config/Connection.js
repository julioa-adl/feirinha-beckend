"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDatabase = () => {
    console.log('Wait connecting to the database');
    mongoose_1.default.connect(
    // eslint-disable-next-line max-len
    `mongodb+srv://${process.env.ATLAS_NAME}:${process.env.ATLAS_PASSWORD}@cluster0.dimfshy.mongodb.net/?retryWrites=true&w=majority`).then(() => console.log('MongoDB Atlas Connected')).catch((error) => console.log(error));
};
exports.default = connectToDatabase;
