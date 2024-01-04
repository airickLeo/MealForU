import express from "express";
const router = express.Router();
import { query, dbConfig } from "../db/index.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

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

// "Add Your Recipe" route
router.post("/add", upload.single('image'), async (req, res) => {
    try {
        console.log("Request to manually add recipe received");
        // Note that name, calories, carbs, protein, and yield were all required fields
        const recipeDetails = req.body;
        console.log(recipeDetails);

        console.log(req.file);

        // // data cleaning (remove empty instructions or ingredients)
        // const cleanedIngredients = recipeDetails.ingredients.map((ingredient, index) => (
        //     ingredient.text == "" ? null : ingredient
        // )).filter((ingredient) => ingredient != null);

        // const cleanedInstructions = recipeDetails.instructions.filter((instruction) => (
        //     instruction.length != 0
        // ));

        // recipeDetails.instructions = cleanedInstructions;
        // recipeDetails.ingredients = cleanedIngredients;
    } catch (err) {
        console.error("Could not manually add recipe", err);
    }

})

export default router;