"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuth = void 0;
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateAuth = (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            res.status(400).json({ message: 'el token no se encontro' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRET_JWT_KEY);
        req.user = decoded;
        next();
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'no se vaido el token' });
        return;
    }
};
exports.validateAuth = validateAuth;
