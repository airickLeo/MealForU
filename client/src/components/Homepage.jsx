import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { ComponentWrapper } from "../hoc"
import { useEffect } from "react";
import axios from "axios"

const HomePage = () => {
    // initialize database
    useEffect(() => {
        const initDB = async () => {
            try {
                const response = await axios.get("http://localhost:8000/");
                console.log(response.data); // Log the response data if needed
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        initDB();
    }, []); // Empty dependency array to run the effect only once when the component mounts

    return (
        <div className="flex flex-col text-center gap-8 h-screen justify-center items-center">
            <h1>
                Welcome to Meal For U, a fullstack application that helps you
                to find the perfect recipe for your diet!
            </h1>
            <h2>
                You can use this website to jot down your favourite recipes, and create your
                own recipe for the records!
            </h2>
            <Link to={"/search"}>
                <button>
                    Let's get your meal &#8594;
                </button>
            </Link>
        </div>
    )
}

export default ComponentWrapper(HomePage);