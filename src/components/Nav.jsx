import React, { useContext, useState } from "react";
import { LuUserCircle2 } from "react-icons/lu";
import { NavLink, Outlet } from "react-router-dom";
import UserMenu from "./UserMenu";
import { MenuContext } from "../context/MenuContext";

const Nav = (props) => {

    const {showOnModalLogin, showOnModalRegister} = props;
    const [showSubMenu, setShowSubMenu] = useState(false);
    const { handleShowOffSubMenu, loginOK, user } = useContext(MenuContext);

    let hidenSubMenuTimeOut;

    const showSubMenuUser = () => {
        clearTimeout(hidenSubMenuTimeOut);
        setShowSubMenu(true);
    }

    const hidenSubMenuUser = () => {
        hidenSubMenuTimeOut = setTimeout(() => {
            setShowSubMenu(false);
        }, 2000);
    }

    return (
        <nav className="bg-[#0A3E79] fixed top-0 w-full h-20 flex justify-between transition-all z-50">
            <div className="w-2/3 flex justify-start items-center ml-16">
                <NavLink to="/" onClick={handleShowOffSubMenu}><img src="public/logoBlanco.png" className="h-16 w-auto py-2 object-cover" alt="" /></NavLink>
            </div>
            <div className="w-1/3 flex justify-end items-center mr-16">
                <ul className="flex flex-row items-center">
                    {
                        loginOK ?
                            <>
                                <li><p className="text-white text-lg">Bienvenido, {user}</p></li>
                                <li><LuUserCircle2 className="text-white text-4xl ml-3" onMouseEnter={showSubMenuUser} onMouseLeave={hidenSubMenuUser}/></li>
                                {showSubMenu && <UserMenu className="transition-colors"/>}
                            </>
                            :
                            <ul className="flex flex-row items-center gap-8">
                                <li><button onClick={showOnModalLogin} className="text-black bg-white rounded-xl px-4 font-semibold text-lg w-36">Iniciar Sesión</button></li>
                                <li><button onClick={showOnModalRegister} className="text-black bg-white rounded-xl px-4 font-semibold text-lg w-36">Resgistrarse</button></li>
                            </ul>
                    }
                </ul>
            </div>
            <Outlet />
        </nav>
    )
};
export default Nav;