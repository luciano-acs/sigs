import React from "react";
import { LuUserCircle2 } from "react-icons/lu";
import { Link, Outlet } from "react-router-dom";

const Nav = (props) => {

    const { showOnModalLogin, user, handleClick } = props;

    const changleLink = () => {
        handleClick('');
    }

    return(
        <nav className="bg-[#0A3E79] fixed top-0 w-full h-20 flex justify-between transition-all">
            <div className="w-2/3 flex justify-start items-center ml-16">
                <Link to="/" onClick={changleLink}><img src="/src/assets/logoBlanco.png" className="h-16 w-auto py-2 object-cover" alt="" /></Link>
            </div>
            <div className="w-1/3 flex justify-end items-center mr-16">
                <ul className="flex flex-row items-center">
                    {
                        user !== '' ?
                        <>
                            <li><p className="text-white text-lg">Bienvenido, {user}</p></li>
                            <li><LuUserCircle2 className="text-white text-4xl ml-3"/></li>
                        </>
                        :
                        <li><button onClick={showOnModalLogin} className="text-black bg-white rounded-xl px-4 font-semibold text-lg">Iniciar Sesión</button></li>  
                    }          
                </ul>
            </div>
            <Outlet />
        </nav>
    )
};
export default Nav;