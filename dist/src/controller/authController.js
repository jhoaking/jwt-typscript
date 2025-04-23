"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.protectedUser = exports.login = exports.regiterUser = void 0;
const authModel_1 = require("../model/authModel");
const AuthService_1 = require("../services/AuthService");
const authSchema_1 = require("../schema/authSchema");
const regiterUser = async (req, res) => {
    try {
        const validar = authSchema_1.authSchema.safeParse(req.body);
        if (!validar.success) {
            res.status(400).json({ errors: validar.error.errors });
            return;
        }
        const { name, email, password } = validar.data;
        const buscarEmail = await authModel_1.authMode.getByEmail(email);
        if (buscarEmail) {
            res.status(400).json({ message: 'ya estas registrado' });
            return;
        }
        const hashearContra = await (0, AuthService_1.hasshedPassword)(password);
        const user = await authModel_1.authMode.register({ name, email, password: hashearContra });
        res.status(200).json({ message: 'usuario registrado', user });
    }
    catch (error) {
        res.status(500).json({
            message: "Error registrando el usuario",
            error: error.message,
        });
    }
};
exports.regiterUser = regiterUser;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(400).json({ message: 'falta la contraseña y el email' });
            return;
        }
        const user = await authModel_1.authMode.getByEmail(email);
        if (!user) {
            res.status(400).json({ message: 'el email no esta registrado' });
            return;
        }
        const validarPassword = await (0, AuthService_1.comparePassword)(password, user.password);
        if (!validarPassword) {
            res.status(400).json({ message: 'contraseña invalida' });
            return;
        }
        const token = (0, AuthService_1.createToken)(user);
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60,
        };
        res
            .status(200)
            .cookie('access_token', token, options)
            .json({ message: 'login exitoso' });
    }
    catch (error) {
        res.status(500).json({
            message: "Error logeando el usuario",
            error: error.message,
        });
    }
};
exports.login = login;
const protectedUser = (req, res) => {
    const user = req.user;
    if (!user) {
        res.status(401).json({ message: 'usuario no autorizado' });
        return;
    }
    res.status(200).json({ message: ' usuario autorizado', user });
};
exports.protectedUser = protectedUser;
const logout = async (_req, res) => {
    res.clearCookie("access_token", { httpOnly: true, sameSite: "strict" })
        .status(200).json({ message: "Logout exitoso" });
};
exports.logout = logout;
