import axios from "axios";
import express from "express";
const router = express.Router();

const apiKey = "3e2d6d1ae92e62b052dd7ca301811846";
const applicationId = "c238012f";
let baseUrl = "https://api.edamam.com/api/recipes/v2"
const defautlParam = {
    app_id: applicationId,
    app_key: apiKey,
    type: "public"
}

// notes:
// keep the total search result to up to 50.
// find a way to find recipes with calorie limit (the yield field gives number of servings).
// protein count should allow users to enter range or number+ on the frontend. We can process this 
// on the backend to query for protein count. (also validation of negative numbers)

// O(n) query function to obtain all recipes (target 100 recipes), where n is the
// number of receipes returned from the API
const obtainRecipes = async (rawData) => {
    // obtain the next 20 resulting recipes from query (API shows only 20 per page)
    let result = []
    let nextPage = "";
    let currRecipe = {};
    let pageCount = rawData.to - rawData.from + 1;
    let targetCount = 100;

    try {
        // nothing found for the current search filter
        if (!rawData || rawData.hits == 0) {
            return result;
        }

        // target to obtain all 100 recipes from API query
        for (let i = 0; i < targetCount; i += 1) {
            // obtain the current (i %  pageCount)th recipe on the current page
            currRecipe = rawData.hits[i % pageCount].recipe;

            // obj that stores the desired data to be delivered to client
            let recipeObj = {
                name: currRecipe.label,
                yield: currRecipe.yield,
                // image might not work for now
                image: currRecipe.image,
                ingredients: [...currRecipe.ingredients],
                calories: currRecipe.calories,
                protein: currRecipe.totalNutrients["PROCNT"].quantity,
                carbs: currRecipe.totalNutrients["CHOCDF"].quantity,
                instructions: currRecipe.instructions,
                ingredients: currRecipe.ingredients,
                favourite: false
            }
            result.push(recipeObj);

            // If this is true, we know we need to obtain the next page of the API
            if ((i + 1) % pageCount == 0) {
                // no more "nextPage"
                if (!rawData["_links"].next || rawData["_links"].length == 0) {
                    break;
                }

                nextPage = rawData["_links"].next.href;
                const response = await axios.get(nextPage);
                rawData = response.data;
            }
        }
        return result;
    } catch (err) {
        console.error(err);
        return (err);
    }
}

// Obtain query data from the EDAMAM API
router.get("/", async (req, res) => {
    try {
        // obtain the query filters
        const queryFilters = req.query;
        let calories = queryFilters.calories || "0+";
        // for protein, we want more than the queryFilters.protein
        let protein = (queryFilters.protein || "0") + "+";
        let carbs = (queryFilters.carbs || "0+");
        const proteinQueryName = "nutrients[PROCNT]";
        const carbsQueryName = "nutrients[CHOCDF]";

        const requestParams = {
            ...defautlParam,
            calories: calories,
            [proteinQueryName]: protein,
            [carbsQueryName]: carbs,
        }

        const apiUrl = `${baseUrl}?${new URLSearchParams(requestParams)}`;
        const response = await axios.get(apiUrl);

        // obtain number of servings, ingredients, instructions, total carbs, total protein,
        // and total calories for a recipe, and the image, also the link to article is needed
        let rawData = response.data;
        let recipeList = await obtainRecipes(rawData);
        console.log("Recipes received: ", recipeList.length);
        res.json(JSON.stringify(recipeList)).status(200);
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: "Error, could not obtain the recipes desired" });
    }
})

export default router;