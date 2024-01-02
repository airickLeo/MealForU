import express from "express";
const router = express.Router();
import { dbConfig, query } from "../db/index.js";

// create database and table if not already exist
router.get("/", async (req, res) => {
    // Check if the database already exists
    const databaseExistsQuery = `SELECT datname FROM pg_catalog.pg_database WHERE datname = $1`;
    let result = await query(databaseExistsQuery, [dbConfig.database]);

    if (result.rowCount === 0) {
        console.log(`${dbConfig.database} database not found, creating it`);
        await query(`CREATE DATABASE "${dbConfig.database}"`);
        console.log(`created database ${dbConfig.database}`);
    } 

    const tableName = "recipes";
    const createTable = `CREATE TABLE IF NOT EXISTS ${tableName} (
        id SERIAL PRIMARY KEY,
        name text,
        ingredients JSONB[],
        instructions JSONB[],
        calories double precision,
        carbs double precision,
        protein double precision,
        yield integer,
        image text,
        favourite boolean
    )`; 

    // check if table exists
    await query(createTable);
});

export default router;
