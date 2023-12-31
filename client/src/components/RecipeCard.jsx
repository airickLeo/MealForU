import { useState } from "react";
import { Pagination } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { returnToTop } from "./BackToTop";

const RecipeCard = (props) => {
    // Set the starting index for recipes with respect to the "recipes" state.
    // Remember we only render "itemPerPage" number of recipes per page
    const [startIndex, setStart] = useState(0);
    const location = useLocation();

    // handles page change of the pagination
    const handlePageChange = (event, page) => {
        event.preventDefault();
        props.setPage(page);
        const startIndex = (page - 1) * props.itemPerPage;
        setStart(startIndex);
        props.setCurrRecipes(props.recipes.slice(startIndex, page * props.itemPerPage));
        returnToTop();
    }

    return (
        <>
            <div className="flex justify-evenly flex-wrap gap-6 w-full items-stretch text-[17px]">
                {props.currRecipes && props.currRecipes.map((recipe, index) => (
                    <Link
                        to={`${location.pathname}/recipe-${index}`}
                        state={{ recipe: recipe, parentRoute: location.pathname }}
                        key={`recipe-${index}`}
                        className="flex flex-col w-full sm:w-[250px] text-center shadow-sm border border-gray-200 rounded-xl mb-4 content-between p-4"
                    >
                        {recipe.image ?
                            <img
                                src={recipe.image}
                                alt={`recipe-${index} image`}
                                className="w-full h-[160px] mb-4 object-cover rounded-2xl"
                            />
                            :
                            <img
                                src={`data:image/png;base64,${recipe.imagebuffer}`}
                                className="w-full h-[160px] mb-4 object-cover rounded-2xl"
                                alt={`recipe-${index} image`} />
                        }

                        <h3 className="text-cyan-500">{recipe.name}</h3>
                        <div className="text-gray-800 mt-4">
                            <p>Total servings: {recipe.yield}</p>
                            <p>Protein per serving: {((recipe.protein) / (recipe.yield)).toFixed(2)}g</p>
                            <p>Carbs per serving: {((recipe.carbs) / (recipe.yield)).toFixed(2)}g</p>
                            <p>Calories per serving: {((recipe.calories) / (recipe.yield)).toFixed(2)}kcal</p>
                        </div>
                    </Link>
                ))}
            </div>
            <Pagination
                count={Math.ceil(props.recipes.length / props.itemPerPage)}
                color="primary"
                className={`${props.recipes.length > 0 ? "flex justify-center mt-8 p-6 mb-8" : "hidden"
                    }`}
                showFirstButton
                showLastButton
                page={props.currPage}
                onChange={handlePageChange}
            />
        </>
    )
}

export default RecipeCard;