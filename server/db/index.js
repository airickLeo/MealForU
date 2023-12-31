import { Pool } from "pg";

const dbConfig = {
    host: "localhost",
    port: 5432,
    database: "MealForU",
    user: 'postgres',
    password: "Newlife@2003"
}

// node-postgres (pg) does automatic client acquiring and releasing
// when executing queries (when doing a single query on the database). 
// So, there is no need for manual acquiring
// and releasing of client (it uses the first available client in the 
// pool) for the query
const pool = new Pool(dbConfig);

export const query = (text, params) => pool.query(text, params);