import { ComponentWrapper } from "../hoc";
import { searchFilters } from "../constants";
import { useState } from "react";

const Search = () => {
    // fields to enable user to search for specified categories
    const [query, setQuery] = useState({
        calories: "",
        protein: "",
        carbs: ""
    });

    const formChange = (targetValue, targetKey) => {
        setQuery({
            ...query,
            [targetKey]: targetValue
        })
    }

    // submit query to backend
    const handleQuery = async (e) => {
        e.preventDefault();
        
    }

    return (
        <div className="w-full flex flex-col mt-12">
            <h2 className="mb-[10%]">
                Input the amount of calories, protein, and carbs as a limit so we
                can find the most suiting meal for you!
            </h2>
            <form className="flex flex-col" onSubmit={(e) => handleQuery(e)}>
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
        </div>
    )
}

export default ComponentWrapper(Search);