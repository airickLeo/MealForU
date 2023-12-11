import { ComponentWrapper } from "../hoc";
import { searchFilters } from "../constants";
import { useState } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';

const Search = () => {
    // fields to enable user to search for specified categories
    const [query, setQuery] = useState({
        calories: "",
        protein: "",
        carbs: ""
    });

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    // Limit number of recipes displayed per page
    const [itemPerPage, setNumItem] = useState(12);
    // Set the starting index for recipes with respect to the "recipes" state.
    // Remember we only render "itemPerPage" number of recipes per page
    const [startIndex, setStart] = useState(0);
    const [currPage, setPage] = useState(1);
    const [currReicpes, setCurrRecipes] = useState([]);

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
        setLoading(true);
        const fetchData = async () => {
            const res = await axios.get("http://localhost:8000/search", {
                params: {
                    ...query
                }
            });
            return res.data;
        }
        const data = JSON.parse(await fetchData())
        setRecipes(data);
        console.log("Data received");
        setLoading(false);
        // always start loading from 0
        setCurrRecipes(data.slice(0, itemPerPage));
    }

    // handles page change of the pagination
    const handlePageChange = (event, page) => {
        event.preventDefault();
        setPage(page);
        const startIndex = (page - 1) * itemPerPage;
        setStart(startIndex);
        setCurrRecipes(recipes.slice(startIndex, page * itemPerPage));
    }

    return (
        <div className="w-full flex flex-col mt-12">
            <h2 className="mb-[5%]">
                Input the amount of calories, protein (at least), and carbs as a limit per serving so we can find the most suiting meal for you!
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

            {loading && (
                <div className="flex justify-center mb-16">
                    <CircularProgress />
                </div>
            )}

            {recipes && (
                <div className="flex justify-evenly flex-wrap gap-6 w-full">
                    {currReicpes.map((recipe, index) => (
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

            <Pagination count={Math.ceil(recipes.length / itemPerPage)} color="primary"
                className={`${recipes.length > 0 ? "flex justify-center mt-8 p-6 mb-8" : "hidden"}`} showFirstButton showLastButton page={currPage} onChange={handlePageChange} />
        </div>
    )
}

export default ComponentWrapper(Search);