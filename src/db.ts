import { createPool } from "mysql2/promise";

import { DB_DATABASE,DB_HOST,DB_PASSWORD,DB_PORT,DB_USER } from "./config";

export const pool = createPool({
    port : DB_PORT,
    user : DB_USER,
    host : DB_HOST,
    database : DB_DATABASE,
    password : DB_PASSWORD
})