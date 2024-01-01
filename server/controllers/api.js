import express from "express";
const router = express.Router();
import { query, dbConfig } from "../db/index.js";

// Home page route (initialize database if it doesn't exist)
router.get('/favourites', async (req, res) => {
    const allFavourites = `SELECT * FROM recipes`;
    const result = await query(allFavourites);
    res.status(200).json(result.rows)
})

export default router;