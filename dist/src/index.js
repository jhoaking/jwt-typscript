"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRoutes_1 = require("./routes/authRoutes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/user', authRoutes_1.routerAuth);
app.listen(config_1.PORT, () => {
    console.log('server on port ', config_1.PORT);
});
