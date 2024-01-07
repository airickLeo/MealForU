import { ComponentWrapper } from "../hoc";
import { searchFilters } from "../constants";
import { useState } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { BackToTop, returnToTop } from "./BackToTop";
import RecipeCard from "./RecipeCard";

const Search = (props) => {
    // fields to enable user to search for specified categories
    const [query, setQuery] = useState({
        calories: "",
        protein: "",
        carbs: ""
    });

    const [loading, setLoading] = useState(false);
    // Limit number of recipes displayed per page
    const [itemPerPage, setNumItem] = useState(12);

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
            try {
                const res = await axios.get("http://localhost:8000/search", {
                    params: {
                        ...query
                    }
                });
                return res.data;
            } catch (error) {
                // Handle the error here
                console.error("Error fetching data:", error);
                throw error; // Rethrow the error to propagate it to the next catch block
            }
        };

        try {
            const data = JSON.parse(await fetchData());
            console.log("Data received");
            setLoading(false);
            if (data.length == 0) {
                alert("No recipes matched the inputted requirements!")
            } else {
                props.setRecipes(data);
                // always start loading from 0
                props.setCurrRecipes(data.slice(0, itemPerPage));
                // return to page 1
                props.setPage(1);
            }
        } catch (error) {
            setLoading(false);
            // Handle specific errors or show a general error message to the user
            alert(error.response.data.message);
            // You can set an error state or show an error message to the user
            setQuery({
                calories: "",
                protein: "",
                carbs: ""
            });
        }
    };


    return (
        <>
            <div className="w-full flex flex-col mt-12">
                <h2 className="mb-[5%]">
                    Input the max amount of calories, minimum amount of protein, and max amount of carbs as a limit per serving so we can find the most suiting meal for you!
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

                {props.recipes && (<RecipeCard {...props} itemPerPage={itemPerPage} />)}
            </div>
            <BackToTop />
        </>
    )
}

export default ComponentWrapper(Search);