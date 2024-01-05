import express from "express";
const router = express.Router();
import { query, dbConfig } from "../db/index.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Home page route (initialize database if it doesn't exist)
router.get('/favourites', async (req, res) => {
    const allFavourites = `SELECT * FROM recipes`;
    let result = await query(allFavourites);

    // Ensure that the image is converted from the byte form back to an image (base 64 string)
    result = result.rows.map((entry, index) => (
        {
            ...entry,
            imagebuffer: entry.imagebuffer ? entry.imagebuffer.toString('base64') : ""
        }
    ))
    res.status(200).json(result)
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

        recipeDetails.ingredients = (typeof recipeDetails.ingredients) != "object" ? [recipeDetails.ingredients] : recipeDetails.ingredients;

        recipeDetails.instructions = (typeof recipeDetails.instructions) != "object" ? [recipeDetails.instructions] : recipeDetails.instructions;

        console.log(recipeDetails);

        // data cleaning (remove empty instructions or ingredients) and conver each
        // json string back to JSON object
        const cleanedIngredients = recipeDetails.ingredients.map(
            jsonStr => JSON.parse(jsonStr)).map((ingredient, index) => (
                ingredient.text == "" ? null : ingredient
            )).filter((ingredient) => ingredient != null);

        const cleanedInstructions = recipeDetails.instructions.filter((instruction) => (
            instruction.length != 0
        ));

        recipeDetails.instructions = cleanedInstructions;
        recipeDetails.ingredients = cleanedIngredients;
        recipeDetails.imageBuffer = req.file ? req.file.buffer : null;

        const addRecipeQuery = "INSERT INTO recipes(name, ingredients, instructions, calories, carbs, protein, yield, imageBuffer, favourite)" +
            " VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)";
        await query(addRecipeQuery, [
            recipeDetails.name,
            recipeDetails.ingredients,
            recipeDetails.instructions || [],
            recipeDetails.calories,
            recipeDetails.carbs,
            recipeDetails.protein,
            recipeDetails.yield,
            recipeDetails.imageBuffer,
            true
        ]).then(res => {
            console.log("Recipe Manually Added To Favourites");
        }).catch(err => {
            console.log("Failed to manually add recipe to favourites", err);
        })

        res.status(200).json({ message: "Recipe Manually Added" });
    } catch (err) {
        console.error("Could not manually add recipe", err);
    }

})

export default router;