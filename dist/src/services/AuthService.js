"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = exports.comparePassword = exports.hasshedPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const hasshedPassword = async (passsword) => {
    try {
        const hashed = await bcrypt_1.default.hash(passsword, config_1.SALT_ROUNDS);
        return hashed;
    }
    catch (error) {
        throw new Error("error al hashear la password");
    }
};
exports.hasshedPassword = hasshedPassword;
const comparePassword = async (passswordNoHashed, hashedPassword) => {
    try {
        const compare = await bcrypt_1.default.compare(passswordNoHashed, hashedPassword);
        return compare;
    }
    catch (error) {
        throw new Error("error al comparar las passwords");
    }
};
exports.comparePassword = comparePassword;
const createToken = (user) => {
    try {
        const token = jsonwebtoken_1.default.sign({ user_id: user.user_id, name: user.name, email: user.email }, config_1.SECRET_JWT_KEY, { expiresIn: '48h' });
        return token;
    }
    catch (error) {
        throw new Error("error al crear el token");
    }
};
exports.createToken = createToken;
const verifyToken = (token) => {
    try {
        const verify = jsonwebtoken_1.default.verify(token, config_1.SECRET_JWT_KEY);
        return verify;
    }
    catch (error) {
        throw new Error("erorr al hashear la password");
    }
};
exports.verifyToken = verifyToken;
