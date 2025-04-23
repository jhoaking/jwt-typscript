"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMode = void 0;
const db_1 = require("../db");
class authMode {
}
exports.authMode = authMode;
_a = authMode;
authMode.register = async (data) => {
    const query = 'INSERT INTO usuarios(name,email,password) VALUES(?,?,?)';
    const values = [data.name, data.email, data.password];
    const [rows] = await db_1.pool.query(query, values);
    return { user_id: rows.insertId, ...data };
};
authMode.getByEmail = async (email) => {
    const query = 'SELECT * FROM usuarios WHERE user_id = ?';
    const [rows] = await db_1.pool.query(query, [email]);
    if (rows.length === 0) {
        return null;
    }
    return rows[0];
};
