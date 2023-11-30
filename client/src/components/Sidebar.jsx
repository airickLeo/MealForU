import sidebarItems from "../constants/sidebarItems";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className="h-full">
            <nav className="h-full bg-white border-r shadow-lg flex flex-col
            pl-6 pt-6">
                <div className="flex items-center justify-between p-4 gap-12">
                    <p> Menu </p>
                    <button className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200">
                        Toggle Menu
                    </button>
                </div>
                <ul className="h-full flex flex-col flex-1 px-3 list-none justify-center">
                    {sidebarItems.map((item) => (
                        <li key={`sidebarItem-${item.id}`} 
                        className="hover:bg-gray-100 rounded-2xl p-4 hover:cursor-pointer">
                            <Link to={`/${item.id}`}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar