import { useLocation } from "react-router-dom";
import { redirect } from "react-router-dom";

const RecipeDetails = (props) => {
    const location = useLocation();
    const state = location.state;

    console.log(state)

    if (!recipeData) {
        return redirect("/search");
    }

    return (
        <div>
            
        </div>
    )
}

export default RecipeDetails