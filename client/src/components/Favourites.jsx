import { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import { ComponentWrapper } from "../hoc";

// Note that we are trying to reuse the RecipeCards component. However, we will need
// to create a separate Recipes and currRecipes state to pass into the RecipeCard component.
// This is because we lifted the states used by the RecipeCard component to App.jsx, causing
// these states now to become global. If we use the same props then we will end up modifying
// the cards in the Search component.
const Favourites = () => {
    const [favRecipes, setFav] = useState([]);
    const [currFav, setCurrFav] = useState([]);
    const [favPerPage, setFavPerPage] = useState(20);
    const [favPage, setFavPage] = useState(1);

    // Fetch all favourite recipes from the database
    useEffect(() => {
        const allFavourites = async () => {
            const favourites = await axios.get("http://localhost:8000/api/favourites");
            setFav(favourites.data);
            setCurrFav(favourites.data.slice(0, favPerPage));
        }
        allFavourites();
    }, [])

    return (
        <div className="flex flex-col mt-12 gap-12">
            <h2 className="text-center gap-4 flex flex-col">
                <p className="font-semibold">Your Favourite Recipes</p>
                <p>
                    (<span className="font-bold text-red-400">{favRecipes.length}</span> Recipes Bookmarked)
                </p>
            </h2>
            {favRecipes && (
                <RecipeCard
                    currRecipes={favRecipes}
                    setPage={(page) => setFavPage(page)}
                    itemPerPage={favPerPage}
                    setCurrRecipes={(recipes) => setCurrFav(recipes)}
                    recipes={favRecipes}
                    currPage={favPage}
                />
            )}
        </div>
    )
}

export default ComponentWrapper(Favourites);