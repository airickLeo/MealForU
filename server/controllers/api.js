import express from "express";
const router = express.Router();
import { query, dbConfig } from "../db/index.js";

// Home page route (initialize database if it doesn't exist)
router.get('/favourites', async (req, res) => {
    const allFavourites = `SELECT * FROM recipes`;
    const result = await query(allFavourites);
    res.status(200).json(result.rows)
})

// Post new recipe as favourites to the database
router.post('/favourites', async (req, res) => {
    const recipeData = req.body;
    const addRecipeQuery = "INSERT INTO recipes(name, ingredients, instructions, calories, carbs, protein, yield, image, favourite)" +  
    " VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)";
    await query(addRecipeQuery, [
        recipeData.name, 
        recipeData.ingredients,
        recipeData.instructions || [],
        recipeData.calories,
        recipeData.carbs,
        recipeData.protein,
        recipeData.yield,
        recipeData.image,
        recipeData.favourite
    ]).then(res => {
        console.log("Successfully added to favourites");
    }).catch(err => {
        console.log("Failed to add recipe to favourites", err);
    })
})

router.delete('/favourites/:id', async (req, res) => {
    console.log("Delete request received");
    const recipeId = req.params.id;
    console.log(recipeId);
    const deleteRecipeQuery = `DELETE FROM recipes where id = ${recipeId}`;
    await query(deleteRecipeQuery).then(response => {
        console.log(`Successfully deleted recipe with id ${recipeId}`);
    }).catch(err => {
        console.error(`Recipe ${recipeId} failed to be deleted: ${err}`);
    })
})

export default router;