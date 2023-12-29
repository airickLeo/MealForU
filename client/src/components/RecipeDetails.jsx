import { Link, useLocation } from "react-router-dom";
import { redirect } from "react-router-dom";
import { BackToTop } from "./BackToTop";
import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { AlertTitle } from '@mui/material';

const RecipeDetails = () => {
    // object destructuring to obtain the state passed
    // through the BrowserRouter Link
    let { state } = useLocation();

    if (!state) {
        return redirect("/search");
    }

    const [savedFavourite, setSaveFavourite] = useState(false);
    // Tell user that the recipe has been added to the favourites
    const [notifyAdded, setNotify] = useState(false);

    return (
        <>
            <Snackbar
                open={notifyAdded}
                onClose={() => { setNotify(false) }}
                autoHideDuration={4000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  // Specify the anchor origin
                className="absolute top-0 w-[80%]"
            >
                <Alert>
                    {state.name} successfully added to favourites
                </Alert>
            </Snackbar>


            <div className="m-12 flex flex-col flex-1 gap-16">
                <div className="flex gap-24">
                    <img src={state.image} className="rounded-xl max-h-[250px] sm:w-[25%]
                    lg:w-[20%] xl:w-[15%]"
                        alt={`recipe-${state.name}`} />
                    <div className="flex flex-col flex-1 gap-6 justify-between">
                        <Link to={"/search"} className="font-semibold text-[16px] bg-slate-100 min-w-[200px] max-w-[30%] rounded-2xl text-center
                    hover:bg-slate-200">
                            <p className="p-[4%] py-[6%]">&larr; Return To Recipes</p>
                        </Link>
                        <h2 className="text-5xl font-handWrite text-gray-600 max-w-[600px]">
                            {state.name}
                        </h2>
                        <p className="text-[20px] font-serif">
                            <span className="font-bold text-red-400 italic">{state.calories.toFixed(0)}</span> total calories -- <span className="font-bold italic text-orange-300">{state.yield.toFixed(0)}</span> servings
                        </p>
                        <div className="items-center flex">
                            <div className="bg-slate-200 px-4 py-1 flex items-center 
                        space-x-4 rounded-2xl hover:cursor-pointer hover:bg-slate-300"
                                onClick={() => (
                                    setSaveFavourite(!savedFavourite),
                                    savedFavourite ? setNotify(false) : setNotify(true)
                                )}>
                                <p
                                    className={
                                        `text-[30px]
                                    ${savedFavourite ? "text-red-600" : "text-black"}`
                                    }>&#9825;</p>
                                <p>Save To Favourites</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <h3 className="font-bold text-[30px] font-serif">
                        Ingredients
                    </h3>
                    <ul className="space-y-2 list-disc mt-3 ml-5 font-semibold marker:text-orange-400">
                        {state.ingredients.map((item, index) => (
                            <li className="tracking-wider">
                                {item.text}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="">
                    <h3 className="font-bold text-[30px] font-serif">
                        Recipe Instructions
                    </h3>
                    <ul className="space-y-2 mt-3 ml-5 font-semibold list-decimal marker:text-orange-400">
                        {state.instructions.map((item, index) => (
                            <li className="tracking-wider">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <BackToTop />
            </div>
        </>
    )
}

export default RecipeDetails