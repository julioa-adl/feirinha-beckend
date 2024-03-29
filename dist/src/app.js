"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_Routes_1 = __importDefault(require("./routes/User.Routes"));
const Login_Routes_1 = __importDefault(require("./routes/Login.Routes"));
const Market_Routes_1 = __importDefault(require("./routes/Market.Routes"));
const Product_Routes_1 = __importDefault(require("./routes/Product.Routes"));
const Feirinha_Routes_1 = __importDefault(require("./routes/Feirinha.Routes"));
const ItensCart_Routes_1 = __importDefault(require("./routes/ItensCart.Routes"));
const Recommendation_Routes_1 = __importDefault(require("./routes/Recommendation.Routes"));
const VerificationCode_Routes_1 = __importDefault(require("./routes/VerificationCode.Routes"));
const Default_Routes_1 = __importDefault(require("./routes/Default.Routes"));
const cors_1 = __importDefault(require("cors"));
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use('/', Default_Routes_1.default);
app.use('/user', User_Routes_1.default);
app.use('/login', Login_Routes_1.default);
app.use('/market', Market_Routes_1.default);
app.use('/product', Product_Routes_1.default);
app.use('/feirinha', Feirinha_Routes_1.default);
app.use('/cart', ItensCart_Routes_1.default);
app.use('/recommendation', Recommendation_Routes_1.default);
app.use('/verificationCode', VerificationCode_Routes_1.default);
exports.default = app;
