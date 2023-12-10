import express, { raw } from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
const port = 8000;

const apiKey = "3e2d6d1ae92e62b052dd7ca301811846";
const applicationId = "c238012f";
const apiUrl = "https://api.edamam.com/api/recipes/v2"
const defautlParam = {
    app_id: applicationId,
    app_key: apiKey,
    type: "public"
}

//notes:
// keep the total search result to up to 50.
// find a way to find recipes with calorie limit (the yield field gives number of servings).
// protein count should allow users to enter range or number+ on the frontend. We can process this 
// on the backend to query for protein count. (also validation of negative numbers)

// O(n) query function to obtain all recipes (target 100 recipes)
const obtainRecipes = (rawData) => {
    // obtain the next 20 resulting recipes from query (API shows only 20 per page)

    let result = []
    const targetCount = 100;
    let nextPage = "";
    let currRecipe = {};
    let pageCount = rawData.to - rawData.from + 1;

    try {
        // obtain all 100 recipes from API query
        for (let i = 0; i < targetCount; i += 1) {
            // obtain the current (i %  pageCount)th recipe on the current page
            console.log(rawData.hits.length);
            currRecipe = rawData.hits[i % pageCount].recipe;

            // obj that stores the desired data to be delivered to client
            let recipeObj = {
                yield: currRecipe.yield,
                // image might not work for now
                image: currRecipe.image,
                ingredients: [...currRecipe.ingredients],
                calories: currRecipe.calories,
                protein: currRecipe.totalNutrients["PROCNT"].quantity
            }

            result.push(recipeObj);

            if (i % pageCount == 0) {
                nextPage = rawData["_links"].next.href;
            }
        }

        console.log(result[0]);
        return result;
    } catch (err) {
        console.error(err);
    }
}

// Obtain query data from the EDAMAM API
app.get("/search", async (req, res) => {
    try {
        // obtain the query filters
        const queryFilters = req.query;
        let calories = queryFilters.calories || "0+";
        let protein = (queryFilters.protein || "0") + "+";
        let carbs = (queryFilters.carbs || "0+");

        const response = await axios.get(apiUrl,
            {
                params: {
                    ...defautlParam,
                    calories: encodeURIComponent(calories),
                    // "nutrients%5BPROCNT%5D": protein + "%2B",
                    // "nutrients%5BCHOCDF%5D": queryFilters.carbs,
                }
            })

        // obtain number of servings, ingredients, instructions, total carbs, total protein,
        // and total calories for a recipe, and the image, also the link to article is needed
        // let rawData = response.data;
        // console.log(rawData);
        // let recipeList = obtainRecipes(rawData);

        // console.log(JSON.stringify(response.data));
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: "Error, could not obtain the recipes desired" });
    }
})

app.listen(port, () => {
    console.log(`Server Listening On Port ${port}`);
})