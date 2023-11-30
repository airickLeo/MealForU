import { Link } from "react-router-dom"
import Sidebar from "./Sidebar"

const HomePage = () => {
    return (
        <div className="h-screen flex">
            <Sidebar />
            <div className="flex flex-col justify-center h-full gap-8 mr-16
            items-center text-center float-none ml-[150px] max-w-[1200px]">
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
        </div>
    )
}

export default HomePage