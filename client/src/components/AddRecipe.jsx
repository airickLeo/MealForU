import { ComponentWrapper } from "../hoc";
import { recipeFields } from "../constants";
import { useState } from "react";

const AddRecipe = () => {
    // The state will have identical field names as the database column names
    const [recipeDetails, setDetails] = useState({
        name: "",
        calories: "",
        carbs: "",
        protein: "",
        yield: "",
        image: "",
        ingredients: "",
        instructions: ""
    })

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

    const submitRecipe = () => {
    }

    return (
        <div className="mt-12 font-serif w-full">
            <h2 className="font-semibold text-red-700">Add your very own recipe below!</h2>
            <div className="flex flex-col lg:flex-row flex-1">
                <div className="flex flex-col w-full">
                    <form className="flex flex-col flex-1 mt-8 w-full">
                        {recipeFields.map((field, index) => (
                            <div key={`addRecipe-field${index}`} className="flex flex-col gap-2 mb-6">
                                <label htmlFor={`recipe-field-${index}`}><b>{field.labelName}</b></label>
                                <input placeholder={`${field.placeHolderName}`} type={`${field.inputType}`} id={`recipe-field-${index}`} value={recipeDetails[field.dbFieldName]}
                                onChange={(e) => handleBasicFormChange(field.dbFieldName, e)}
                                    className="py-2 pl-3 outline rounded-xl outline-2 outline-slate-400 shadow-lg hover:outline-[3px] hover:outline-slate-500 max-w-[400px]" />
                            </div>
                        ))}
                        <div className="flex flex-col gap-2 mb-6">
                            <label htmlFor={`recipe-field-image`}><b>Recipe Image</b></label>
                            <input id={`recipe-field-image`} type="file" accept="image/*"
                                className="py-2 pl-3 outline rounded-xl outline-2 outline-slate-400 shadow-lg hover:outline-[3px] hover:outline-slate-500 max-w-[400px] flex justify-end" 
                                onChange={(e) => handleImageChange(e)}
                                />
                        </div>
                        <div className="flex justify-start mt-3">
                            <button type="submit" className="py-2 px-4 max-w-[200px] outline outline-2 outline-blue-400 hover:outline-none">
                                Add To Favourites!
                            </button>
                        </div>
                    </form>
                </div>
                <div>

                </div>
            </div>
        </div>

    )
}

export default ComponentWrapper(AddRecipe);