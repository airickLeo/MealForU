import { Link, useLocation } from "react-router-dom";
import { redirect } from "react-router-dom";

const RecipeDetails = () => {
    // object destructuring to obtain the state passed
    // through the BrowserRouter Link
    let { state } = useLocation();
    console.log(state);

    if (!state) {
        return redirect("/search");
    }

    return (
        <div className="m-12 flex flex-col flex-1">
            <div className="flex gap-24">
                <img src={state.image} className="rounded-xl max-h-[250px] min-w-[15%] max-w-[20%]"
                    alt={`recipe-${state.name}`} />
                <div className="flex flex-col flex-1 gap-6 justify-between">
                    <Link to={"/search"} className="font-bold text-[16px] bg-slate-100 min-w-[200px] max-w-[30%] rounded-2xl text-center">
                        <p className="p-[4%]">&larr; Return To Recipes</p>
                    </Link>
                    <h3 className="text-5xl font-handWrite text-gray-600 max-w-[600px]">
                        {state.name}
                    </h3>
                    <p className="text-[20px] font-serif">
                        <span className="font-bold text-red-400 italic">{state.calories.toFixed(0)}</span> total calories -- <span className="font-bold italic text-orange-300">{state.yield.toFixed(0)}</span> servings
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RecipeDetails