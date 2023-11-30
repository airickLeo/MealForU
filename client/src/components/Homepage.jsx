import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <>
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
        </>
    )
}

export default HomePage