import { ComponentWrapper } from "../hoc";
import { searchFilters } from "../constants";
import { useState } from "react";
import axios from "axios";

const Search = () => {
    // fields to enable user to search for specified categories
    const [query, setQuery] = useState({
        calories: "",
        protein: "",
        carbs: ""
    });

    const [recipes, setRecipes] = useState([]);

    const formChange = (targetValue, targetKey) => {
        setQuery({
            ...query,
            [targetKey]: targetValue
        })
    }

    // submit query to backend
    // We make it async so that the user cannot interact with the browser
    // at this time
    const handleQuery = async (e) => {
        e.preventDefault();

        const fetchData = async () => {
            const res = await axios.get("http://localhost:8000/search", {
                params: {
                    ...query
                }
            });
            return res.data;
        }
        setRecipes(JSON.parse(await fetchData()));
        console.log("Data received");
    }

    return (
        <div className="w-full flex flex-col mt-12">
            <h2 className="mb-[5%]">
                Input the amount of calories, protein, and carbs as a limit so we
                can find the most suiting meal for you!
            </h2>
            <form className="flex flex-col mb-12" onSubmit={(e) => handleQuery(e)}>
                <div className="flex flex-wrap justify-between gap-4">
                    {searchFilters.map((filter) => (
                        <input type="text" key={`searchFilter-${filter.id}`}
                            placeholder={`${filter.name} in ${filter.unit}...`} value={query[`${filter.id}`]}
                            onChange={(e) => formChange(e.target.value, filter.id)}
                            className="p-3 border rounded-3xl border-1
                        hover:border-purple-500 bg-slate-100 border-slate-200
                        shadow-md"
                        />
                    ))}
                </div>
                <button type="submit"
                    className="mt-8 w-32 rounded-3xl border-2 bg-blue-300 border-indigo-100 hover:border-black">
                    Find Recipe!
                </button>
            </form>

            {recipes && (
                <div className="flex justify-evenly flex-wrap gap-6 w-full">
                    {recipes.map((recipe, index) => (
                        <div className="w-[250px] text-center shadow-sm shadow-slate-400
                        border border-gray-200 p-2 rounded-xl" key={`recipe-${index}`}>
                            <img src={recipe.image}
                                alt={`recipe-${index} image`}
                                className="w-auto height-[100px] mb-4" />
                            <h3>{recipe.name}</h3>
                            <p>Total servings: {recipe.yield}</p>
                            <p>Protein per serving: {((recipe.protein) / (recipe.yield)).toFixed(2)}g</p>
                            <p>Carbs per serving: {((recipe.carbs) / (recipe.yield)).toFixed(2)}g</p>
                            <p>Calories per serving: {((recipe.calories) / (recipe.yield)).toFixed(2)}kcal</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ComponentWrapper(Search);