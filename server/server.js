import express from "express";
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


// Obtain query data from the EDAMAM API
app.get("/search", async (req, res) => {
    try {
        const queryFilters = req.query;
        console.log(queryFilters)
        const response = await axios.get(apiUrl,
            {
                params: {
                    ...defautlParam,
                    calories: queryFilters.calories,
                    "nutrients%5BPROCNT%5D": queryFilters.protein,
                    "nutrients%5BCHOCDF%5D": queryFilters.carbs
                }
            })

        // obtain number of servings, ingredients, instructions, total carbs, total protein,
        // and total calories for a recipe, and the image, also the link to article is needed
        console.log(JSON.stringify(response.data));
    } catch (err) {
        res.status(404).json({ message: "Error, could not obtain the recipe desired" });
    }
})

app.listen(port, () => {
    console.log(`Server Listening On Port ${port}`);
})