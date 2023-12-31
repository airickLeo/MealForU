import { useEffect, useState } from "react";
import axios from "axios";

const Favourites = () => {
    const [favRecipes, setFav] = useState([]);

    useEffect(() => {
        const allFavourites = async () => {
            const data = await axios.get("http://localhost:8000/api/favourites");
            return data
        }
        const data = allFavourites();
        setFav(data);
    }, [])

    return (
        <div>
            <h2>
                Your Favourite Recipes
                {favRecipes.length}
            </h2>
        </div>
    )
}

export default Favourites