import { Router } from "express";
import { regiterUser,login,protectedUser, logout } from "../controller/authController";
import { validateAuth } from "../middleware/validateAuth";

export const routerAuth = Router();


routerAuth.post('/login', login);
routerAuth.post('/register', regiterUser);
routerAuth.get('/protected', validateAuth, protectedUser);
routerAuth.get('/logout', logout)
