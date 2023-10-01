"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const Connection_1 = __importDefault(require("./config/Connection"));
const cors_1 = __importDefault(require("cors"));
app_1.default.use((0, cors_1.default)());
const PORT = process.env.PORT || 3001;
(0, Connection_1.default)();
app_1.default.listen(PORT, () => console.log(`Running server on port: ${PORT}`));
