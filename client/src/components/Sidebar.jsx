import { useState } from "react";
import sidebarItems from "../constants/sidebarItems";
import { Link } from "react-router-dom";
import { openMenu, closeMenuIcon } from "../assets/index.js"

const Sidebar = () => {
    const [menuOpen, setMenu] = useState(true);

    const closeMenu = () => {
        setMenu(!menuOpen);
    }

    return (
        <>
            {menuOpen && (
                <aside className="h-full max-w-[30%] min-w-[150px]">
                    <nav className="w-full h-full bg-white border-r shadow-lg flex flex-col
            pl-[6%] pt-[6%]">
                        <div className="flex items-center justify-between p-[8%] gap-[20%] mt-[50px]">
                            <p> Menu </p>
                            <button className="p-[3%] rounded-lg bg-gray-100 hover:bg-gray-200 max-w-[85px]" 
                                onClick={closeMenu}>
                                <img src={closeMenuIcon} alt="closeMenu" />
                            </button>
                        </div>

                        <ul className="h-full flex flex-col flex-1 px-3 list-none justify-center">
                            {sidebarItems.map((item) => (
                                <Link to={`/${item.id}`}
                                    className="hover:bg-gray-100 rounded-2xl p-4 hover:cursor-pointer"
                                    key={`sidebarItem-${item.id}`}>
                                    <li>
                                        {item.name}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </nav>
                </aside>
            )}
            {!menuOpen && (
                <button onClick={setMenu}
                    className="rounded-full max-w-[85px] h-[85px] mt-[50px]">
                    <img src={openMenu} alt="openMenu" className="2" />
                </button>
            )}
        </>
    )
}

export default Sidebar