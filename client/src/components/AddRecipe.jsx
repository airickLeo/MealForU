import { ComponentWrapper } from "../hoc";
import { recipeFields } from "../constants";
import { useState } from "react";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

const AddRecipe = () => {
    // The state will have identical field names as the database column names
    const [recipeDetails, setDetails] = useState({
        name: "",
        calories: "",
        carbs: "",
        protein: "",
        yield: "",
        image: "",
        ingredients: [{ text: "" }],
        instructions: [""]
    })

    const [addedToFav, setAdded] = useState(false);

    // Handle form changes such as text and number inputs
    const handleBasicFormChange = (field, e) => {
        setDetails({
            ...recipeDetails,
            [field]: e.target.value
        })
    }

    const handleImageChange = (e) => {
        setDetails({
            ...recipeDetails,
            image: e.target.files[0]
        })
    }

    const submitRecipe = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // append all to formData besides array datastructures
        for (const [key, value] of Object.entries(recipeDetails)) {
            if (key != "instructions" && key != "ingredients") {
                formData.append(key, value);
            }
        }

        // Append instructions and ingredients separately
        for (const value of recipeDetails.instructions) {
            formData.append('instructions', value);
        }
        
        // Serialize objects to JSON string so they can be handled
        // by multer
        for (const ingredientObj of recipeDetails.ingredients) {
            formData.append("ingredients", JSON.stringify(ingredientObj));
        }

        // Display the key/value pairs
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        await axios.post("http://localhost:8000/api/add",
            formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            setAdded(true);
            console.log("Manual Recipe Successfully Added To Favourites");
            // Reset state
            setDetails({
                name: "",
                calories: "",
                carbs: "",
                protein: "",
                yield: "",
                image: "",
                ingredients: [{ text: "" }],
                instructions: [""]
            });
        }).catch(err => {
            console.error("Unable to add manual recipe to favourites ", err);
        })
    }

    return (
        <div className="mt-12 font-serif w-full">
            <Snackbar
                open={addedToFav}
                onClose={() => { setAdded(false) }}
                autoHideDuration={4000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  // Specify the anchor origin
                className="absolute top-0 w-[80%]"
            >
                <Alert>
                    Recipe successfully added to favourites
                </Alert>
            </Snackbar>
            <h2 className="font-semibold text-red-700 lg:text-center">Add your very own recipe below!</h2>
            <form className="flex flex-col flex-1 mt-8 w-full" onSubmit={(e) => submitRecipe(e)} id="addRecipeForm">
                <div className="flex flex-col lg:flex-row w-full">
                    <div className="flex flex-col w-[400px] mt-1">
                        {recipeFields.map((field, index) => (
                            <div key={`addRecipe-field${index}`} className="flex flex-col gap-2 mb-6">
                                <label htmlFor={`recipe-field-${index}`}><b>{field.labelName}</b><span className="text-red-700">&nbsp; *</span></label>
                                <input placeholder={`${field.placeHolderName}`} type={`${field.inputType}`} id={`recipe-field-${index}`} value={recipeDetails[field.dbFieldName]}
                                    onChange={(e) => handleBasicFormChange(field.dbFieldName, e)}
                                    className="py-2 pl-3 outline rounded-xl outline-2 outline-slate-400 shadow-lg hover:outline-[3px] hover:outline-slate-500 max-w-[400px]"
                                    required
                                />
                            </div>
                        ))}
                        <div className="flex flex-col gap-2 mb-12">
                            <label htmlFor={`recipe-field-image`}><b>Recipe Image</b></label>
                            <input id={`recipe-field-image`} type="file" accept="image/*"
                                className="py-2 pl-3 outline rounded-xl outline-2 outline-slate-400 shadow-lg hover:outline-[3px] hover:outline-slate-500 max-w-[400px] flex justify-end"
                                onChange={(e) => handleImageChange(e)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mb-6 lg:ml-16 w-full">
                        <label htmlFor={`recipe-field-ingredients`}><b>Ingredients</b></label>
                        {recipeDetails.ingredients.map((ingredientObj, index) => (
                            <input id={`recipe-field-ingredient-${index}`} type="text" autoComplete="off"
                                className="py-2 pl-3 outline rounded-xl outline-2 outline-slate-400 shadow-lg hover:outline-[3px] hover:outline-slate-500 max-w-[400px] flex justify-end"
                                onChange={
                                    (e) => (setDetails({
                                        ...recipeDetails,
                                        ingredients: recipeDetails.ingredients.map((ingredient, i) => (
                                            i == index ? { ...ingredient, text: e.target.value } : ingredient
                                        ))
                                    }))
                                }
                                key={`ingredient-${index}`}
                                placeholder={`Enter Ingredient ${index + 1}`}
                            />
                        ))}
                        <button className="bg-slate-300 hover:bg-slate-200 max-w-[400px] font-semibold"
                            onClick={() =>
                                setDetails({
                                    ...recipeDetails,
                                    ingredients: [...recipeDetails.ingredients, { text: "" }]
                                })}
                            type="button"
                        >
                            &#43; Add More Ingredients
                        </button>
                    </div>
                    <div className="flex flex-col gap-3 mb-6 lg:ml-16 w-full">
                        <label htmlFor={`recipe-field-instructions`}><b>Recipe Instructions</b></label>
                        {recipeDetails.instructions.map((instruction, index) => (
                            <input id={`recipe-field-instruction-${index}`} type="text" autoComplete="off"
                                className="py-2 pl-3 outline rounded-xl outline-2 outline-slate-400 shadow-lg hover:outline-[3px] hover:outline-slate-500 max-w-[400px] flex justify-end"
                                onChange={
                                    (e) => (setDetails({
                                        ...recipeDetails,
                                        instructions: recipeDetails.instructions.map((instruction, i) => (
                                            i == index ? e.target.value : instruction
                                        ))
                                    }))
                                }
                                key={`instruction-${index}`}
                                placeholder={`Enter instruction ${index + 1}`}
                            />
                        ))}
                        <button className="bg-slate-300 hover:bg-slate-200 max-w-[400px] font-semibold"
                            onClick={() =>
                                setDetails({
                                    ...recipeDetails,
                                    instructions: [...recipeDetails.instructions, ""]
                                })}
                            type="button"
                        >
                            &#43; Add More Instructions
                        </button>
                    </div>
                </div>
                <div className="flex justify-start my-3 lg:justify-center">
                    <button type="submit" className="py-2 px-4 max-w-[200px] outline outline-3 outline-blue-400 hover:outline-none font-bold">
                        Add To Favourites!
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ComponentWrapper(AddRecipe);