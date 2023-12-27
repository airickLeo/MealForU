import { useLocation } from "react-router-dom";
import { redirect } from "react-router-dom";

const RecipeDetails = (props) => {
    // object destructuring to obtain the state passed
    // through the BrowserRouter Link
    let {state} = useLocation();
    console.log(state);

    if (!state) {
        return redirect("/search");
    }

    return (
        <div>
            
        </div>
    )
}

export default RecipeDetails