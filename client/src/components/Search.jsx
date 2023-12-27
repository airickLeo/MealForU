import { ComponentWrapper } from "../hoc";
import { searchFilters } from "../constants";
import { useState } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import { BackToTop, returnToTop } from "./BackToTop";
import { Link } from "react-router-dom";
import RecipeDetails from "./RecipeDetails";

const Search = (props) => {
    console.log(props.currPage)
    // fields to enable user to search for specified categories
    const [query, setQuery] = useState({
        calories: "",
        protein: "",
        carbs: ""
    });

    const [loading, setLoading] = useState(false);
    // Limit number of recipes displayed per page
    const [itemPerPage, setNumItem] = useState(12);
    // Set the starting index for recipes with respect to the "recipes" state.
    // Remember we only render "itemPerPage" number of recipes per page
    const [startIndex, setStart] = useState(0);

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
        props.setRecipes(data);
        console.log("Data received");
        setLoading(false);
        // always start loading from 0
        props.setCurrRecipes(data.slice(0, itemPerPage));
        // return to page 1
        props.setPage(1);
    }

    // handles page change of the pagination
    const handlePageChange = (event, page) => {
        event.preventDefault();
        props.setPage(page);
        const startIndex = (page - 1) * itemPerPage;
        setStart(startIndex);
        props.setCurrRecipes(recipes.slice(startIndex, page * itemPerPage));
        returnToTop();
    }

    return (
        <>
            <div className="w-full flex flex-col mt-12">
                <h2 className="mb-[5%]">
                    Input the amount of calories, protein (at least), and carbs as a limit per serving so we can find the most suiting meal for you!
                </h2>
                <form className="flex flex-col mb-12" onSubmit={(e) => handleQuery(e)}>
                    <div className="flex justify-between gap-5 flex-wrap">
                        {searchFilters.map((filter) => (
                            <div className="flex flex-col text-center gap-2" key={`searchFilter-${filter.id}`}>
                                <label>
                                    {filter.name}
                                </label>
                                <input type="text"
                                    placeholder={`${filter.id} in ${filter.unit}...`} value={query[`${filter.id}`]}
                                    onChange={(e) => formChange(e.target.value, filter.id)}
                                    className="p-3 border rounded-3xl border-1
                        hover:border-purple-500 bg-slate-100 border-slate-200
                        shadow-md"
                                />
                            </div>
                        ))}
                        <button type="submit"
                            className="mt-8 w-32 rounded-3xl border-2 bg-blue-300 border-indigo-100 hover:border-black">
                            Find Recipe!
                        </button>
                    </div>
                </form>

                {loading && (
                    <div className="flex justify-center mb-16">
                        <CircularProgress />
                    </div>
                )}

                {props.recipes && (
                    <>
                        <div className="flex justify-evenly flex-wrap gap-6 w-full">
                            {props.currRecipes.map((recipe, index) => (
                                <Link to={`/search/recipe-${index}`} state={recipe}
                                    key={`recipe-${index}`}>
                                    <div className="w-[250px] text-center shadow-sm shadow-slate-400
                        border border-gray-200 p-2 rounded-xl" >
                                        <img src={recipe.image}
                                            alt={`recipe-${index} image`}
                                            className="w-auto height-[100px] mb-4 rounded-2xl" />
                                        <h3 className="text-cyan-500">{recipe.name}</h3>
                                        <div className="text-gray-800 mt-4">
                                            <p>Total servings: {recipe.yield}</p>
                                            <p>Protein per serving: {((recipe.protein) / (recipe.yield)).toFixed(2)}g</p>
                                            <p>Carbs per serving: {((recipe.carbs) / (recipe.yield)).toFixed(2)}g</p>
                                            <p>Calories per serving: {((recipe.calories) / (recipe.yield)).toFixed(2)}kcal</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <Pagination count={Math.ceil(props.recipes.length / itemPerPage)} color="primary"
                            className={`${props.recipes.length > 0 ? "flex justify-center mt-8 p-6 mb-8" : "hidden"}`} 
                            showFirstButton showLastButton page={props.currPage} onChange={handlePageChange} />
                    </>
                )}
            </div>
            <BackToTop />
        </>
    )
}

export default ComponentWrapper(Search);