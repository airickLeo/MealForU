import { useEffect, useState } from "react";
import axios from "axios";

const Favourites = () => {
    const [favRecipes, setFav] = useState([]);

    useEffect(() => {
        const data = axios.get("/api/favourites");
        console.log(data);
    })

    return (
        <div>
            <h2>
                Your Favourite Recipes
            </h2>
        </div>
    )
}

export default Favourites